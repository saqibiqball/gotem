import React, { useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { Nav } from 'rsuite';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { useSelector } from 'react-redux';
import MainSettings from '@/components/Pages/ProfileSettings/MainSettings';
import ChangePassword from '@/components/Pages/ProfileSettings/ChangePassword';
import DisputeEmail from '@/components/Pages/DashboardAdmin/settings/DisputeEmail';

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
							<Nav.Item eventKey="dispute_email">Dispute email</Nav.Item>
						</Nav>
					</MWT_Col>
					<MWT_Col className="mt-20 offset-lg-2" lg={8}>
						{active === 'main_settings' && <MainSettings user={currentUser} />}
						{active === 'change_password' && <ChangePassword />}
						{active === 'dispute_email' && <DisputeEmail />}
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
