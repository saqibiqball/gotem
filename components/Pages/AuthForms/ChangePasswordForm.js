import React, { useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import { resetPassword } from '@/http/userAPI';

const { StringType } = Schema.Types;
const model = Schema.Model({
	password: StringType().isRequired('The password field is required.'),
	check_password: StringType()
		.addRule((value, data) => {
			return value === data.password;
		}, 'The two password do not match')
		.isRequired('This field is required.'),
});

const ChangePasswordForm = () => {
	const form = useRef();
	const router = useRouter();
	const [formError, setFormError] = useState({});
	const [formData, setFormData] = useState({
		password: '',
		check_password: '',
	});

	const handleSubmit = async () => {
		if (!form.current.check()) return true;

		try {
			if (typeof router.query['link'] === 'undefined') return true;
			const data = await resetPassword(router.query.link, formData.password);
			CustomNotice({ content: data });
			setFormData({
				password: '',
				check_password: '',
			});
			setTimeout(() => {
				router.push('/');
			}, 3000);
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
			<MWT_Row className="c-mb-20">
				<MWT_Col>
					<CustomField
						name="password"
						label={'Password'}
						type="password"
						error={formError.password}
						className="flex-column"
					/>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						name="check_password"
						label={'Confirm Password'}
						type="password"
						error={formError.check_password}
						className="flex-column"
					/>
				</MWT_Col>
				<MWT_Col className="mt-20">
					<Form.Group>
						<Button block className="rs-btn-main" onClick={handleSubmit}>
							Reset password
						</Button>
					</Form.Group>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default ChangePasswordForm;
