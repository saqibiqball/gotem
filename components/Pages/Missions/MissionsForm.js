import React from 'react';
import { useRouter } from 'next/router';
import { Button, Checkbox, DatePicker, Form, InputNumber, SelectPicker, TagPicker } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import GoogleInput from '@/components/UI/GoogleInput';
import CustomUploaderFiles from '@/components/UI/CustomUploaderFiles';

const MissionsForm = ({
	form,
	setFormError,
	formError,
	formValue,
	setFormValue,
	model,
	fetching,
	handleSubmit,
	properties,
}) => {
	const router = useRouter();
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
			ref={form}
			onCheck={setFormError}
			formError={formError}
			model={model}
			checkTrigger="change"
			formValue={formValue}
			onChange={setFormValue}
		>
			<MWT_Row className="c-mb-16" gutter={16}>
				<MWT_Col lg={6} xxl={4}>
					<CustomField
						placeholder="Mission title"
						disabled={fetching}
						type="text"
						name="title"
						error={formError.title}
					/>
				</MWT_Col>
				<MWT_Col lg={6} xxl={4}>
					<CustomField
						accepter={SelectPicker}
						placeholder="Mission type"
						disabled={fetching}
						name="missionFundingTypeId"
						data={properties.missionFundingTypes || []}
						searchable={false}
						valueKey="id"
						labelKey="name"
						cleanable={false}
						error={formError.missionFundingTypeId}
					/>
				</MWT_Col>
				<MWT_Col lg={6} xxl={4}>
					<CustomField
						accepter={TagPicker}
						placeholder="Mission category"
						disabled={fetching}
						name="catId"
						data={properties.missionCategories || []}
						searchable={false}
						valueKey="id"
						labelKey="name"
						cleanable={false}
						error={formError.catId}
					/>
				</MWT_Col>
				<MWT_Col lg={6} xxl={4}>
					<GoogleInput
						error={formError.location}
						placeholder="Location"
						disabled={fetching}
						setFormValue={setFormValue}
						defaultValue={formValue.location}
						onPlaceSelected={onPlaceSelectedHandler}
					/>
				</MWT_Col>
				<MWT_Col lg={6} xxl={4}>
					<CustomField
						placeholder="Estimated budget"
						disabled={fetching}
						min={0}
						accepter={InputNumber}
						name="estimatedBudget"
						error={formError.estimatedBudget}
					/>
				</MWT_Col>
				<MWT_Col lg={6} xxl={2}>
					<CustomField
						placeholder="Deadline"
						disabled={fetching}
						accepter={DatePicker}
						format="MM-dd-yyyy HH:mm:ss"
						name="deadline"
						error={formError.deadline}
					/>
				</MWT_Col>

				<MWT_Col lg={6} xxl={2}>
					<CustomField
						accepter={SelectPicker}
						placeholder="Mission privacy"
						disabled={fetching}
						name="missionTypeId"
						data={properties.missionTypes || []}
						searchable={false}
						valueKey="id"
						labelKey="name"
						cleanable={false}
						error={formError.missionTypeId}
					/>
				</MWT_Col>
				<MWT_Col lg={6} xxl={8}>
					<CustomField
						name="isRemote"
						accepter={Checkbox}
						disabled={fetching}
						checked={formValue.isRemote}
						onChange={() =>
							setFormValue({ ...formValue, isRemote: !formValue.isRemote })
						}
					>
						Remote mission
					</CustomField>
				</MWT_Col>
				<MWT_Col lg={6} xxl={4}>
					<CustomField
						name="isUrgent"
						accepter={Checkbox}
						disabled={fetching}
						checked={formValue.isUrgent}
						onChange={() =>
							setFormValue({ ...formValue, isUrgent: !formValue.isUrgent })
						}
					>
						Urgent
					</CustomField>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						placeholder="Mission general description"
						name="description"
						disabled={fetching}
						accepter="textarea"
						rows={5}
						error={formError.description}
					/>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						placeholder="Mission objectives"
						name="objectives"
						disabled={fetching}
						accepter="textarea"
						rows={5}
						error={formError.objectives}
					/>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						accepter={CustomUploaderFiles}
						accept="image/png, image/jpeg, image/jpg, image/svg, application/pdf"
						name="missionFiles"
						disabled={fetching}
						fileList={formValue.missionFiles}
						setFormValue={setFormValue}
						error={formError.missionFiles}
						setFormError={setFormError}
						errorMsg="You can only upload pdf and image files"
						multiple={true}
						confirmNodal={false}
						draggable
					>
						<div>
							<i className="ico ico-Cloud-upload-Bold fs-60 color-main" />
							<h6 className="h-small mt-20">Click to upload or drag’n’drop</h6>
							<p>Upload relevant files (default is private)</p>
						</div>
					</CustomField>
				</MWT_Col>
				<MWT_Col>
					<Form.Group>
						<Button className="rs-btn-main mr-20" onClick={handleSubmit}>
							submit your mission
						</Button>
						<Button className="rs-btn-main2" onClick={() => router.back()}>
							cancel
						</Button>
					</Form.Group>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default MissionsForm;
