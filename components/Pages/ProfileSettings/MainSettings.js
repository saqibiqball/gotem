import React, { useEffect, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import MainSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/MainSettingsForm';
import CustomNotice from '@/components/UI/CustomNotice';
import { updateUser } from '@/http/userAPI';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '@/store/user/action';

const { StringType } = Schema.Types;

const model = Schema.Model({
	firstName: StringType().isRequired('The field is required.'),
	lastName: StringType().isRequired('The field is required.'),
	nickName: StringType().isRequired('The field is required.'),
	email: StringType().isEmail('test@test.com').isRequired('The field is required.'),
	location: StringType().isRequired('The field is required.'),
});

const MainSettings = ({ user }) => {
	const dispatch = useDispatch();
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		photo: [],
		nickName: '',
		firstName: '',
		lastName: '',
		email: '',
		locationLat: 0,
		locationLng: 0,
		location: '',
		country: '',
		city: '',
		countryShortName: '',
		bio: '',
		alternativeEmail: '',
		jobTitle: '',
		showJobTitle: false,
		skillName: '',
		deletedSkills: [],
		user_skills: [],
	});
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		setFormValue((prevState) => ({
			...prevState,
			photo: user.photo,
			nickName: user.nickName,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			location: user.location,
			country: user.country,
			countryShortName: user.countryShortName,
			city: user.city,
			locationLat: user.locationLat,
			locationLng: user.locationLng,
			bio: user.bio,
			jobTitle: user.jobTitle,
			showJobTitle: user.showJobTitle,
			alternativeEmail: user.alternativeEmail,
			user_skills: user.skills,
		}));
	}, [user]);

	const handleSubmit = async () => {
		if (!form.current.check()) return true;
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				if (key === 'uploaded_photo') {
					formValue[key].forEach((item) => {
						data.append('uploaded_photo', item.file);
					});
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else {
					data.append(key, formValue[key]);
				}
			});
			data.append('skills', JSON.stringify(skills));
			setSkills([]);
			const updatedUser = await updateUser(data);
			dispatch(updateUserAction(updatedUser));
			CustomNotice({
				content: `Your Settings was updated`,
				type: 'success',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<div className="ls p-32 bordered">
			<h6>Profile</h6>
			<p>Update your photo and personal details here.</p>
			<hr />
			<MainSettingsForm
				formError={formError}
				setSkills={setSkills}
				skills={skills}
				form={form}
				model={model}
				formValue={formValue}
				setFormValue={setFormValue}
				setFormError={setFormError}
				fetching={fetching}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default MainSettings;
