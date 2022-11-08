import React, { useEffect, useRef, useState } from 'react';
import CustomNotice from '@/components/UI/CustomNotice';
import CategoriesSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/CategoriesSettingsForm';
import { updateUser } from '@/http/userAPI';
import { useDispatch } from 'react-redux';
import { updateUserAction } from '@/store/user/action';
import { Schema } from 'rsuite';

const { ArrayType } = Schema.Types;

const model = Schema.Model({
	cats: ArrayType().isRequired('The field is required.'),
});

const CategoriesSettings = ({ user }) => {
	const form = useRef();
	const dispatch = useDispatch();
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		cats: [],
	});

	useEffect(() => {
		setFormValue((prevState) => ({
			...prevState,
			cats: user.cats.map((cat) => cat.id),
		}));
	}, [user]);

	const handleSubmit = async () => {
		if (!form.current.check()) return true;
		setFetching(true);
		try {
			const updatedUser = await updateUser(formValue);
			dispatch(updateUserAction(updatedUser));
			CustomNotice({
				content: `Your update your categories`,
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
			<h6>Your Categories</h6>
			<p>Update your categories</p>
			<hr />
			<CategoriesSettingsForm
				model={model}
				form={form}
				formValue={formValue}
				setFormValue={setFormValue}
				fetching={fetching}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};

export default CategoriesSettings;
