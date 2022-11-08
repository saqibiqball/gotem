import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import ProposalsTab from '@/components/Pages/Proposals/ProposalsTab';
import { Nav } from 'rsuite';
import ProposalsMatchLevelTab from '@/components/Pages/Proposals/ProposalsMatchLevelTab';

const Index = () => {
	const router = useRouter();
	const [active, setActive] = useState('proposals');

	const linkBack = () => {
		router.back();
	};

	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xl={10} className="ml-auto mr-auto">
						<div>
							<span
								className="fs-24 fw-500 links-darkColor cursor-pointer d-in-flex align-center"
								onClick={linkBack}
							>
								<i className="ico-Chevron-double-left mr-10" /> Back to my missions
							</span>
						</div>
						<div className="divider-30" />
						<Nav activeKey={active} className="wrap" onSelect={handleSelect}>
							<Nav.Item eventKey="proposals">Proposals</Nav.Item>
							<Nav.Item eventKey="match_levels">Match levels</Nav.Item>
						</Nav>
						<div className="divider-30" />
						{active === 'proposals' && <ProposalsTab />}
						{active === 'match_levels' && <ProposalsMatchLevelTab />}
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
