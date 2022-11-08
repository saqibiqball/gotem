import Image from 'next/image';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import LoginForm from '@/components/Pages/AuthForms/LoginForm';
import React from 'react';

export default function Home() {
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
							<span>Sign in to your account</span>
						</h6>
						<div className="divider-40" />
						<div className="p-30 p-xxl-65 ls shadow rounded">
							<LoginForm />
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
}
