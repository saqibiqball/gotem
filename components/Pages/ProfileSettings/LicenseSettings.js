import React, { useEffect, useRef, useState } from 'react';
import CustomNotice from '@/components/UI/CustomNotice';
import { updateUser } from '@/http/userAPI';
import LicenseSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/LicenseSettingsForm';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '@/store/user/action';

const LicenseSettings = ({ user }) => {
	const form = useRef();
	const dispatch = useDispatch();
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		licenseFiles: [],
		userLicense: '',
	});

	useEffect(() => {
		setFormValue((prevState) => ({
			...prevState,
			licenseFiles: user.licenseFiles,
			userLicense: user.userLicense,
			uploaded_licenseFiles: [],
		}));
	}, [user]);

	const handleSubmit = async () => {
		if (!form.current.check()) return true;
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				if (key === 'uploaded_licenseFiles') {
					formValue[key].forEach((item) => {
						data.append('uploaded_licenseFiles', item.file);
					});
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else {
					data.append(key, formValue[key]);
				}
			});

			const updatedUser = await updateUser(data);
			dispatch(updateUserAction(updatedUser));
			CustomNotice({
				content: `License was updated`,
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
			<h6>Your license</h6>
			<p>Update your license</p>
			<hr />
			<LicenseSettingsForm
				form={form}
				formValue={formValue}
				setFormValue={setFormValue}
				fetching={fetching}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default LicenseSettings;
