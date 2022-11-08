import React, { useEffect, useRef, useState } from 'react';
import CustomNotice from '@/components/UI/CustomNotice';
import { updateUser } from '@/http/userAPI';
import VerificationSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/VerificationSettingsForm';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '@/store/user/action';

const BillingSettings = ({ user }) => {
	const form = useRef();
	const dispatch = useDispatch();
	const [fetching, setFetching] = useState(false);
	const cleanForm = {
		files: [],
		selfyFiles: [],
	};
	const [formValue, setFormValue] = useState(cleanForm);

	useEffect(() => {
		setFormValue((prevState) => ({
			...prevState,
			files: user.files,
			selfyFiles: user.selfyFiles,
		}));
	}, [user]);

	const handleSubmit = async () => {
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				if (key === 'uploaded_files') {
					formValue[key].forEach((item) => {
						data.append('uploaded_files', item.file);
					});
				} else if (key === 'uploaded_selfyFiles') {
					formValue[key].forEach((item) => {
						data.append('uploaded_selfyFiles', item.file);
					});
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else {
					data.append(key, formValue[key]);
				}
			});
			const updatedUser = await updateUser(data);
			setFormValue(cleanForm);
			dispatch(updateUserAction(updatedUser));
			CustomNotice({
				content: `Verification files was updated`,
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
			<h6>Your Verification files</h6>
			<p>Update your verification files</p>
			<hr />
			<VerificationSettingsForm
				form={form}
				formValue={formValue}
				setFormValue={setFormValue}
				fetching={fetching}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default BillingSettings;
