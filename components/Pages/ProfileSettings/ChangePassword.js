import React, { useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import { updateUser } from '@/http/userAPI';
import CustomNotice from '@/components/UI/CustomNotice';

const { StringType } = Schema.Types;

const model = Schema.Model({
	current_password: StringType().isRequired('The password field is required.'),
	password: StringType().isRequired('The password field is required.'),
	check_password: StringType()
		.addRule((value, data) => {
			return value === data.password;
		}, 'The two password do not match')
		.isRequired('This field is required.'),
});

const ChangePassword = () => {
	const form = useRef();
	const [fetching, setFetching] = useState(false);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		current_password: '',
		password: '',
		check_password: '',
	});

	const handleSubmit = async () => {
		if (!form.current.check()) return true;
		setFetching(true);
		try {
			await updateUser(formValue);
			CustomNotice({
				content: `Password was updated`,
				type: 'success',
			});
			setFormValue({
				current_password: '',
				password: '',
				check_password: '',
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
			<h6>Change your password</h6>
			<hr />
			<Form
				ref={form}
				onCheck={setFormError}
				formError={formError}
				model={model}
				checkTrigger="change"
				formValue={formValue}
				onChange={setFormValue}
			>
				<MWT_Row className="c-mb-20">
					<MWT_Col lg={4}>
						<CustomField
							name="current_password"
							label="Current password"
							type="password"
							disabled={fetching}
							error={formError.current_password}
						/>
					</MWT_Col>
					<MWT_Col lg={4}>
						<CustomField
							name="password"
							label="New Password"
							type="password"
							disabled={fetching}
							error={formError.password}
						/>
					</MWT_Col>
					<MWT_Col lg={4}>
						<CustomField
							name="check_password"
							label="Confirm Password"
							type="password"
							disabled={fetching}
							error={formError.check_password}
						/>
					</MWT_Col>
					<MWT_Col>
						<div className="divider-20" />
						<Form.Group>
							<Button
								disabled={fetching}
								className="rs-btn-main"
								onClick={handleSubmit}
							>
								Update Password
							</Button>
						</Form.Group>
					</MWT_Col>
				</MWT_Row>
			</Form>
		</div>
	);
};

export default ChangePassword;
