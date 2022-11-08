import React, { useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { Nav } from 'rsuite';
import CustomLoader from '@/components/UI/CustomLoader';
import dynamic from 'next/dynamic';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import RateSettings from '@/components/Pages/ProfileSettings/RateSettings';
import NotificationSettings from '@/components/Pages/ProfileSettings/NotificationSettings';
import VerificationSettings from '@/components/Pages/ProfileSettings/VerificationSettings';
import { useSelector } from 'react-redux';
import LicenseSettings from '@/components/Pages/ProfileSettings/LicenseSettings';
import MainSettings from '@/components/Pages/ProfileSettings/MainSettings';
import CategoriesSettings from '@/components/Pages/ProfileSettings/CategoriesSettings';

const ChangePasswordsDynamic = dynamic(
	() => import('@/components/Pages/ProfileSettings/ChangePassword'),
	// eslint-disable-next-line react/display-name
	{ loading: () => <CustomLoader /> }
);

const Index = () => {
	const [active, setActive] = useState('main_settings');
	const { currentUser } = useSelector((state) => state.user);

	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col lg={8} className="offset-lg-2">
						<h5>Settings</h5>
						<Nav
							appearance="subtle"
							activeKey={active}
							className="wrap"
							onSelect={handleSelect}
						>
							<Nav.Item eventKey="main_settings">Profile</Nav.Item>
							<Nav.Item eventKey="change_password">Password</Nav.Item>
							<Nav.Item eventKey="verification">KYC Verification</Nav.Item>
							{currentUser.roleId === 3 && (
								<Nav.Item eventKey="license">License</Nav.Item>
							)}
							<Nav.Item eventKey="billing">Rate</Nav.Item>
							<Nav.Item eventKey="categories">Categories</Nav.Item>
							<Nav.Item eventKey="notification">Notification</Nav.Item>
						</Nav>
					</MWT_Col>
					<MWT_Col className="mt-20 offset-lg-2" lg={8}>
						{active === 'main_settings' && <MainSettings user={currentUser} />}
						{active === 'change_password' && <ChangePasswordsDynamic />}
						{active === 'billing' && <RateSettings user={currentUser} />}
						{active === 'verification' && <VerificationSettings user={currentUser} />}
						{currentUser.roleId === 3 && (
							<>
								{active === 'license' && <LicenseSettings user={currentUser} />}
								{active === 'categories' && (
									<CategoriesSettings user={currentUser} />
								)}
							</>
						)}
						{active === 'notification' && <NotificationSettings user={currentUser} />}
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
