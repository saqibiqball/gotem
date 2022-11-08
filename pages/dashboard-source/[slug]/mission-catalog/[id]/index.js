import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { checkHasProposal, getMissionInfo } from '@/http/missionsAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import MissionPageSideBarPrivate from '@/components/Pages/Missions/MissionPage/MissionPageSideBarPrivate';
import MissionPageSideBarCrowdfund from '@/components/Pages/Missions/MissionPage/MissionPageSideBarCrowdfund';
import MissionPageContent from '@/components/Pages/Missions/MissionPage/MissionPageContent';

const Index = () => {
	const router = useRouter();
	const { id } = router.query;
	const [mission, setMission] = useState({});
	const [hasProposal, setHasProposal] = useState(false);
	const [fetch, setFetch] = useState(false);

	useEffect(() => {
		const fetchMission = async () => {
			setFetch(true);
			try {
				if (id) {
					const missionData = await getMissionInfo(id);
					const result = await checkHasProposal(id);
					setMission(missionData);
					setHasProposal(result);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchMission();
	}, [id]);

	return (
		<section className="case-item">
			<MWT_Container fluid className="px-0">
				{fetch && (
					<MWT_Row>
						<MWT_Col>
							<CustomLoader />
						</MWT_Col>
					</MWT_Row>
				)}
				{!fetch && Object.keys(mission).length > 0 && (
					<MWT_Row className="mx-0">
						<MWT_Col xxl={10} xl={9} className="py-30 px-30 py-xxl-55 px-xxl-55">
							{hasProposal && (
								<div className="ls px-32 py-32 bordered mb-20">
									<p>You have already submitted a proposal</p>
								</div>
							)}
							<MissionPageContent mission={mission} hasProposal={hasProposal} />
						</MWT_Col>
						<MWT_Col
							xxl={2}
							xl={3}
							className="ls py-30 px-30 py-xxl-55 px-xxl-35 border-xl-left"
						>
							{mission.missionTypeId === 1 && (
								<MissionPageSideBarPrivate mission={mission} />
							)}
							{mission.missionTypeId === 2 && (
								<MissionPageSideBarCrowdfund mission={mission} />
							)}
						</MWT_Col>
					</MWT_Row>
				)}
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
