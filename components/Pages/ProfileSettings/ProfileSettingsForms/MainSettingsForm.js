import React from 'react';
import { Button, Checkbox, Form, SelectPicker, Tag, TagGroup } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import GoogleInput from '@/components/UI/GoogleInput';
import CustomUploaderImage from '@/components/UI/CustomUploaderImage';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import { deleteSkillAction } from '@/store/user/action';
import { useDispatch } from 'react-redux';

const MainSettingsForm = ({
	formError,
	form,
	model,
	formValue,
	setFormValue,
	setFormError,
	fetching,
	handleSubmit,
	roleId,
	roles,
	statuses,
	skills,
	setSkills,
}) => {
	const dispatch = useDispatch();
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

	const addSkillHandler = (skill) => {
		setSkills([...skills, skill]);
		setFormValue({ ...formValue, skillName: '' });
	};

	const deleteAddedSkillHandler = (index) => {
		setSkills(skills.filter((_, i) => i !== index));
	};

	const deleteHandler = (id) => {
		const filterSkillsArr = formValue.user_skills.filter((skill) => skill.id !== id);
		dispatch(deleteSkillAction(id));
		setFormValue({
			...formValue,
			user_skills: filterSkillsArr,
			deletedSkills: [...formValue.deletedSkills, id],
		});
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
			layout="horizontal"
		>
			<CustomField
				label="First name"
				placeholder="First name"
				disabled={fetching}
				type="text"
				name="firstName"
				error={formError.firstName}
			/>
			<hr />
			<CustomField
				label="Last name"
				placeholder="Last name"
				disabled={fetching}
				type="text"
				name="lastName"
				error={formError.lastName}
			/>
			<hr />
			<CustomField
				label="Profile name"
				placeholder="Profile name"
				disabled={fetching}
				type="text"
				name="nickName"
				error={formError.nickName}
			/>
			<hr />
			<CustomField
				label="Email"
				placeholder="Email"
				disabled={fetching}
				type="text"
				name="email"
				error={formError.email}
			/>
			<hr />
			<GoogleInput
				error={formError.location}
				label="Location"
				placeholder="Location"
				setFormValue={setFormValue}
				defaultValue={formValue.location}
				onPlaceSelected={onPlaceSelectedHandler}
			/>
			<hr />
			<CustomField
				accepter={CustomUploaderImage}
				message="This will be displayed on your profile"
				name="photo"
				disabled={fetching}
				confirmNodal
				label="Your photo"
				fileList={formValue.photo}
				setFormValue={setFormValue}
				multiple={false}
			/>
			<hr />
			{roleId === 1 && roles && (
				<>
					<CustomField
						label="Account password"
						placeholder="Account password"
						disabled={fetching}
						type="text"
						name="password"
						error={formError.password}
					/>
					<hr />
				</>
			)}
			{roleId === 1 && roles && (
				<>
					<CustomField
						accepter={SelectPicker}
						label="Role"
						placeholder="Role"
						disabled={fetching}
						name="roleId"
						data={roles}
						searchable={false}
						cleanable={false}
						valueKey="id"
						labelKey="nameAndDescription"
						error={formError.roleId}
					/>
					<hr />
				</>
			)}
			{roleId === 1 && statuses && (
				<>
					<CustomField
						accepter={SelectPicker}
						label="Change Status"
						placeholder="Change Status"
						disabled={fetching}
						name="statusId"
						searchable={false}
						cleanable={false}
						data={statuses}
						valueKey="id"
						labelKey="name"
						error={formError.statusId}
					/>
					<hr />
				</>
			)}
			<CustomField
				label="Your bio"
				message="Write a short introduction"
				placeholder="Your bio"
				name="bio"
				disabled={fetching}
				accepter="textarea"
				rows={5}
				error={formError.bio}
			/>
			<hr />
			<CustomField
				label="Job title"
				placeholder="Job title"
				disabled={fetching}
				type="text"
				name="jobTitle"
				error={formError.jobTitle}
			/>
			<CustomField
				name="showJobTitle"
				accepter={Checkbox}
				disabled={fetching}
				checked={formValue.showJobTitle}
				onChange={() =>
					setFormValue({ ...formValue, showJobTitle: !formValue.showJobTitle })
				}
			>
				Show my job title in my profile
			</CustomField>
			<hr />
			<MWT_Row className="c-mb-20">
				<MWT_Col>
					<div className="skills-input">
						<CustomField
							label="Skills"
							placeholder="Skills"
							disabled={fetching}
							type="text"
							name="skillName"
							onKeyDown={(e) =>
								e.key === 'Enter' &&
								formValue.skillName.length > 0 &&
								addSkillHandler(formValue.skillName)
							}
						/>
						<Button
							className="btn-icon"
							onClick={() =>
								formValue.skillName.length > 0 &&
								addSkillHandler(formValue.skillName)
							}
						>
							+
						</Button>
					</div>
				</MWT_Col>
				<MWT_Col>
					<TagGroup>
						{formValue.user_skills?.length > 0 &&
							formValue.user_skills.map((skill) => (
								<Tag
									key={skill.id}
									closable
									className="bg-greyColor"
									onClose={() => deleteHandler(skill.id)}
								>
									{skill.name}
								</Tag>
							))}
						{skills &&
							skills.length > 0 &&
							skills.map((skill, i) => (
								<Tag
									key={i}
									className="bg-greyColor"
									closable
									onClose={() => deleteAddedSkillHandler(i)}
								>
									{skill}
								</Tag>
							))}
					</TagGroup>
				</MWT_Col>
			</MWT_Row>
			<hr />
			<CustomField
				label="Alternative contact"
				placeholder="Alternative contact"
				disabled={fetching}
				type="text"
				name="alternativeEmail"
				error={formError.alternativeEmail}
			/>
			<Button disabled={fetching} className="rs-btn-main" onClick={handleSubmit}>
				save
			</Button>
		</Form>
	);
};

export default MainSettingsForm;
