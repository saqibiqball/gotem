import React from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import Chat from '@/components/Chat';

const Index = () => {
	return (
		<section className="ls ms s-py-30 s-py-xxl-60">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<h6 className="mb-20">Messages</h6>
						<Chat />
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
