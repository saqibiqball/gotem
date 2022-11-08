import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomField from '@/components/UI/CustomField';
import { changeDisputeEmail, getDisputeEmail } from '@/http/globalSettingsAPI';
import CustomNotice from '@/components/UI/CustomNotice';

const { StringType } = Schema.Types;

const model = Schema.Model({
	email: StringType().isRequired('The email field is required.'),
	check_email: StringType()
		.addRule((value, data) => {
			return value === data.email;
		}, 'The two emails do not match')
		.isRequired('This field is required.'),
});

const DisputeEmail = () => {
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [fetch, setFetch] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		check_email: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				setFormData({ ...formData, email: await getDisputeEmail() });
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	const handleSubmit = async () => {
		if (!form.current.check()) return true;

		setFetch(true);
		try {
			const isChangedDisputeEmail = await changeDisputeEmail(formData);
			if (isChangedDisputeEmail) {
				setFormData({
					...formData,
					check_email: '',
				});
			}
			CustomNotice({
				content: 'Dispute Email was changed',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetch(false);
	};

	return (
		<div className="ls p-32 bordered">
			<h6>Change dispute email</h6>
			<hr />
			<Form
				ref={form}
				onChange={setFormData}
				onCheck={setFormError}
				formError={formError}
				model={model}
				formValue={formData}
				checkTrigger="change"
			>
				<MWT_Row className="c-mb-20">
					<MWT_Col lg={6}>
						<CustomField
							name="email"
							label={'Email'}
							type="text"
							disabled={fetch}
							placeholder={'Abuse Email Name'}
							error={formError.email}
							className="flex-column"
						/>
					</MWT_Col>
					<MWT_Col lg={6}>
						<CustomField
							name="check_email"
							label={'Confirm Email'}
							type="text"
							disabled={fetch}
							error={formError.check_email}
							className="flex-column"
						/>
					</MWT_Col>
					<MWT_Col>
						<Form.Group>
							<Button className="rs-btn-main" disabled={fetch} onClick={handleSubmit}>
								Update Dispute Email
							</Button>
						</Form.Group>
					</MWT_Col>
				</MWT_Row>
			</Form>
		</div>
	);
};

export default DisputeEmail;
