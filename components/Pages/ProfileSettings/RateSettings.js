import React, { useEffect, useRef, useState } from 'react';
import CustomNotice from '@/components/UI/CustomNotice';
import { updateUser } from '@/http/userAPI';
import RateSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/RateSettingsForm';
import { updateUserAction } from '@/store/user/action';
import { useDispatch } from 'react-redux';

const RateSettings = ({ user }) => {
	const form = useRef();
	const dispatch = useDispatch();
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		hourlyRate: 0,
	});

	useEffect(() => {
		setFormValue((prevState) => ({
			...prevState,
			hourlyRate: user.hourlyRate,
		}));
	}, [user]);

	const handleSubmit = async () => {
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				data.append(key, formValue[key]);
			});
			const updatedUser = await updateUser(data);
			dispatch(updateUserAction(updatedUser));
			CustomNotice({
				content: `Rate was updated`,
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
			<h6>Your Rate</h6>
			<p>Update your rate</p>
			<hr />
			<RateSettingsForm
				form={form}
				formValue={formValue}
				setFormValue={setFormValue}
				fetching={fetching}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default RateSettings;
