import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { Nav } from 'rsuite';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import NotificationSettings from '@/components/Pages/ProfileSettings/NotificationSettings';
import VerificationSettings from '@/components/Pages/ProfileSettings/VerificationSettings';
import { isSourcerFetch } from '@/http/userAPI';
import { useSelector } from 'react-redux';
import LicenseSettings from '@/components/Pages/ProfileSettings/LicenseSettings';
import MainSettings from '@/components/Pages/ProfileSettings/MainSettings';
import ChangePassword from '@/components/Pages/ProfileSettings/ChangePassword';
import CustomNotice from '@/components/UI/CustomNotice';

const Index = () => {
	const [active, setActive] = useState('main_settings');
	const [isSourcer, setIsSourcer] = useState(false);
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetch = async () => {
			try {
				if (currentUser.activationLink) {
					const isSourcerData = await isSourcerFetch(currentUser.activationLink);
					setIsSourcer(isSourcerData);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
		};
		fetch();
	}, [currentUser]);

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
							{isSourcer && <Nav.Item eventKey="license">License</Nav.Item>}
							<Nav.Item eventKey="notification">Notification</Nav.Item>
						</Nav>
					</MWT_Col>
					<MWT_Col className="mt-20 offset-lg-2" lg={8}>
						{active === 'main_settings' && <MainSettings user={currentUser} />}
						{active === 'change_password' && <ChangePassword />}
						{active === 'verification' && <VerificationSettings user={currentUser} />}
						{isSourcer && (
							<>{active === 'license' && <LicenseSettings user={currentUser} />}</>
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
