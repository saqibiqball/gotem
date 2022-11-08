import React, { useRef, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import UserForm from '@/components/Pages/DashboardAdmin/users/UserForm';
import CustomNotice from '@/components/UI/CustomNotice';
import { Schema } from 'rsuite';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { registration } from '@/http/userAPI';
import Image from 'next/image';
import scrollToTop from '@/helpers/scrollToTop';

const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
	email: StringType().isEmail('test@test.com').isRequired('The field is required.'),
	password: StringType().isRequired('The field is required.'),
	nickName: StringType().isRequired('The field is required.'),
	firstName: StringType().isRequired('The field is required.'),
	lastName: StringType().isRequired('The field is required.'),
	roles: NumberType().isRequired('The field is required.'),
});

const Index = () => {
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [fetching, setFetching] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [formValue, setFormValue] = useState({
		photo: {},
		nickName: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
		roles: null,
		locationLat: 0,
		locationLng: 0,
		country: '',
	});

	const handleSubmit = async () => {
		if (!form.current.check()) {
			scrollToTop();
			return true;
		}
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				data.append(key, formValue[key]);
			});
			const res = await registration(data);
			setSuccessMsg(res);
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};
	return (
		<section className="ls ms s-py-90 s-py-xl-120 h-100">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xxl={6} xl={6} lg={8} xs={12} className="text-center ml-auto mr-auto">
						<Image
							alt="logo"
							src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo.svg'}
							width={116}
							height={40}
						/>
						<div className="divider-30" />
						<h6 className="special-heading">
							<span>Add new user</span>
						</h6>
						<div className="divider-40" />
						<div className="p-30 p-xxl-65 ls shadow rounded">
							{successMsg.length > 0 ? (
								<p className="text-center">{successMsg}</p>
							) : (
								<UserForm
									form={form}
									setFormError={setFormError}
									formError={formError}
									formValue={formValue}
									setFormValue={setFormValue}
									fetching={fetching}
									handleSubmit={handleSubmit}
									buttonText="Create user"
									model={model}
								/>
							)}
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
