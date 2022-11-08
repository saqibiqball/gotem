import React, { useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import CustomNotice from '@/components/UI/CustomNotice';
import { lostPassword } from '@/http/userAPI';

const { StringType } = Schema.Types;
const model = Schema.Model({
	email: StringType()
		.isEmail('Please enter a valid email address.')
		.isRequired('The email field is required.'),
});

const PasswordForgotForm = () => {
	const form = useRef();
	const [formData, setFormData] = useState({
		email: '',
	});
	const [formError, setFormError] = useState({});

	const handleSubmit = async () => {
		if (!form.current.check()) return true;

		try {
			const data = await lostPassword(formData.email);
			setFormData({ email: '' });
			CustomNotice({ content: data });
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	return (
		<Form
			className="text-left"
			ref={form}
			onChange={setFormData}
			onCheck={setFormError}
			formError={formError}
			model={model}
			formValue={formData}
			checkTrigger="change"
		>
			<CustomField label="Email" name="email" error={formError.email} type="text" />
			<Form.Group>
				<Button block className="rs-btn-main" onClick={handleSubmit}>
					Reset password
				</Button>
			</Form.Group>
		</Form>
	);
};

export default PasswordForgotForm;
