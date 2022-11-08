import React from 'react';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import Image from 'next/image';
import ChangePasswordForm from '@/components/Pages/AuthForms/ChangePasswordForm';

const ChangePassword = () => {
	return (
		<section className="ls ms s-py-90 s-py-xl-120 h-100">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xxl={4} xl={6} lg={8} xs={12} className="text-center ml-auto mr-auto">
						<div className="login-logo">
							<Image
								alt="logo"
								src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo.svg'}
								width={1120}
								height={456}
								quality={100}
							/>
						</div>
						<div className="divider-30" />
						<h6 className="special-heading">
							<span>Password Reset</span>
						</h6>
						<div className="divider-20" />
						<p className="color-darkColor">Please enter your new password.</p>
						<div className="divider-40" />
						<div className="p-30 p-xxl-65 ls shadow rounded">
							<ChangePasswordForm />
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

export default ChangePassword;
