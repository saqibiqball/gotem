import React from 'react';
import { Button, Form, SelectPicker, Uploader } from 'rsuite';
import Image from 'next/image';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import useRequest from '@/hooks/useRequest';
import { getRoles, getRolesWithOutAdmin } from '@/http/userAPI';
import { useSelector } from 'react-redux';
import GoogleInput from '@/components/UI/GoogleInput';

const OptionsLightbox = () => {
	return {
		thumbnails: {
			thumbnailsPosition: 'right',
			thumbnailsSize: ['185px', '154px'],
			thumbnailsGap: '5px 0',
		},
		buttons: {
			showDownloadButton: false,
			size: '35px',
		},
		caption: {
			showCaption: false,
		},
		settings: {
			autoplaySpeed: 5000,
		},
	};
};

const UserForm = ({
	form,
	setFormError,
	formError,
	formValue,
	setFormValue,
	model,
	fetching,
	handleSubmit,
	buttonText,
	// deleteImageHandler,
	// deleteImageHandler2
}) => {
	const { isAuth, currentUser } = useSelector((state) => state.user);
	const [roles, loading1] = useRequest(getRoles);
	const [rolesWithOutAdmin, loading3] = useRequest(getRolesWithOutAdmin);
	const isLoading = !loading1 && !loading3;
	const srcFoo = (key, img = 'placeholder-bg.png') => {
		let src;
		if (formValue.photo.length > 0) {
			src = process.env.NEXT_PUBLIC_API_URL + formValue.photo;
		} else {
			const blob = new Blob([formValue.photo]);

			if (typeof formValue[key].name == 'string' && formValue[key] !== undefined) {
				src = URL.createObjectURL(blob);
			} else {
				src = process.env.NEXT_PUBLIC_API_URL + img;
			}
		}

		return src;
	};

	const chooseIcon = (key, value) => {
		setFormValue((prevState) => ({
			...prevState,
			[key]: value[value.length - 1].blobFile,
		}));
	};

	const onPlaceSelectedHandler = (place) => {
		if (place.name === '') return true;
		const locationObj = {
			locationLat: place.geometry.location.lat(),
			locationLng: place.geometry.location.lng(),
		};
		place.address_components.forEach((address) => {
			const neededObjForCountry =
				address.types.includes('country') && address.types.includes('political');

			const neededObjForCity =
				address.types.includes('locality') && address.types.includes('political');

			const neededObjForAdministartiveArea =
				address.types.includes('administrative_area_level_1') &&
				address.types.includes('political');

			if (neededObjForCountry) {
				locationObj.country = address.long_name;
				locationObj.countryShortName = address.short_name;
			}
			if (neededObjForCity) {
				locationObj.city = address.long_name;
			}

			if (neededObjForAdministartiveArea) {
				locationObj.administartiveArea = address.short_name;
			}
		});
		setFormValue((prev) => ({ ...prev, ...locationObj, location: place.formatted_address }));
	};

	return (
		<Form
			className="text-left"
			ref={form}
			onCheck={setFormError}
			formError={formError}
			model={model}
			checkTrigger="change"
			formValue={formValue}
			onChange={setFormValue}
		>
			{isLoading && (
				<>
					<MWT_Row className="c-mb-25">
						<MWT_Col>
							<GoogleInput
								error={formError.location}
								label="Location"
								placeholder="Location"
								setFormValue={setFormValue}
								defaultValue={formValue.location}
								onPlaceSelected={onPlaceSelectedHandler}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								label="First name"
								placeholder="First name"
								disabled={fetching}
								type="text"
								name="firstName"
								error={formError.firstName}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								label="Last name"
								placeholder="Last name"
								disabled={fetching}
								type="text"
								name="lastName"
								error={formError.lastName}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								label="Profile name"
								placeholder="Profile name"
								disabled={fetching}
								type="text"
								name="nickName"
								error={formError.nickName}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								action={'/'}
								name="photo"
								label="Choose Profile Picture (must be a real picture of yourself)"
								listType="picture"
								accepter={Uploader}
								accept="image/png, image/jpeg, image/jpg, image/svg"
								multiple={false}
								// fileList={formValue.photo}
								fileListVisible={false}
								autoUpload={false}
								onChange={(val) => chooseIcon('photo', val)}
								className="img-fit img-original-size img-with-border"
								disabled={fetching}
								draggable
							>
								<Image
									className="bordered"
									width={50}
									height={50}
									alt="icon"
									src={srcFoo('photo')}
								/>
							</CustomField>
						</MWT_Col>
						{isAuth && currentUser.roleId === 1 ? (
							<MWT_Col>
								<CustomField
									accepter={SelectPicker}
									label="Role"
									placeholder="Role"
									disabled={fetching}
									name="roles"
									data={roles}
									searchable={false}
									valueKey="id"
									labelKey="nameAndDescription"
									error={formError.roles}
								/>
							</MWT_Col>
						) : (
							<MWT_Col>
								<CustomField
									accepter={SelectPicker}
									label="Role"
									placeholder="Role"
									disabled={fetching}
									name="roles"
									data={rolesWithOutAdmin}
									valueKey="id"
									searchable={false}
									labelKey="nameAndDescription"
									error={formError.roles}
								/>
							</MWT_Col>
						)}
						<MWT_Col>
							<CustomField
								label="Email"
								placeholder="Email"
								disabled={fetching}
								type="text"
								name="email"
								error={formError.email}
							/>
						</MWT_Col>
						<MWT_Col>
							<CustomField
								label="Account password"
								placeholder="Account password"
								disabled={fetching}
								type="text"
								name="password"
								error={formError.password}
							/>
						</MWT_Col>

						{formValue.files &&
							formValue.files.length > 0 &&
							formValue.selfyFiles &&
							formValue.selfyFiles.length > 0 && (
								<MWT_Col>
									<CustomField
										accepter={SelectPicker}
										label="Change Status"
										placeholder="Change Status"
										disabled={fetching}
										name="statuses"
										data={statuses}
										valueKey="id"
										labelKey="name"
										error={formError.statuses}
									/>
								</MWT_Col>
							)}

						<MWT_Col>
							<Form.Group>
								<Button block className="rs-btn-main" onClick={handleSubmit}>
									{buttonText}
								</Button>
							</Form.Group>
						</MWT_Col>
					</MWT_Row>
				</>
			)}
		</Form>
	);
};

export default UserForm;
