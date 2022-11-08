import React, { useContext, useRef, useState } from 'react';
import { Button, Checkbox, Form, Schema } from 'rsuite';
import Link from 'next/link';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import CustomNotice from '@/components/UI/CustomNotice';
import { login } from '@/http/userAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/user/action';
import { useRouter } from 'next/router';
import scrollToTop from '@/helpers/scrollToTop';
import { SocketContext } from '@/context/socket';

const { StringType } = Schema.Types;
const model = Schema.Model({
	email: StringType()
		.isEmail('Please enter a valid email address.')
		.isRequired('The email field is required.'),
	password: StringType().isRequired('The password field is required.'),
});

const LoginForm = () => {
	const form = useRef();
	const router = useRouter();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		remember: false,
	});
	const [formError, setFormError] = useState({});
	const socket = useContext(SocketContext);

	const handleSubmit = async () => {
		if (!form.current.check()) {
			scrollToTop();
			return true;
		}

		try {
			const user = await login(formData);
			dispatch(setUser(user));
			socket.emit('addUser', { userId: user.id, role: user.roleId });
			switch (user.roleId) {
				case 1:
					await router.replace(`/dashboard-admin/${user.slug}`);
					break;
				case 2:
					await router.replace(`/dashboard-user/${user.slug}`);
					break;
				default:
					await router.replace(`/dashboard-source/${user.slug}`);
			}
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
			formDefaultValue={formData}
			checkTrigger="change"
		>
			<MWT_Row className="c-mb-25">
				<MWT_Col>
					<CustomField
						label="Email address"
						name="email"
						type="email"
						error={formError.email}
					/>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						label="Password"
						name="password"
						type={show ? 'text' : 'password'}
						error={formError.password}
						inputButton={'ico ' + (!show ? 'ico-Eye' : 'ico-Eye-off')}
						inputButtonHandler={() => {
							setShow(!show);
						}}
					/>
				</MWT_Col>
				<MWT_Col className="d-flex d-wrap">
					<Checkbox
						name="remember"
						checked={formData.remember}
						className="rs-checkbox-small mr-auto pr-10"
						onChange={() => setFormData({ ...formData, remember: !formData.remember })}
					>
						Remember Me
					</Checkbox>
					<Link href="/password-forgot">
						<a className="links-colorMain2">Forgot your password?</a>
					</Link>
				</MWT_Col>
				<MWT_Col>
					<Form.Group>
						<Button block className="rs-btn-main" onClick={handleSubmit}>
							Sign in
						</Button>
					</Form.Group>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default LoginForm;
