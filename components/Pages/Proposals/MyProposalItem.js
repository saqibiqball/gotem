import React from 'react';
import { Button, ButtonGroup } from 'rsuite';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProposalDescription from '@/components/Pages/Proposals/ProposalDescription';
import MissionItemContent from '@/components/Pages/Missions/MissionItemContent';
import MissionItemAuthor from '@/components/Pages/Missions/MissionItemAuthor';

const ProposalItem = ({ item }) => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);

	const lintToProposal = () => {
		router.push(`/dashboard-source/${currentUser.slug}/my-proposals/${item.id}`);
	};

	return (
		<>
			<div className="proposal ls p-30 bordered mb-20">
				<div className="case-item">
					<Link
						href={`/dashboard-source/${currentUser.slug}/mission-catalog/${item.mission.id}`}
					>
						<a className="mr-auto">
							<h4 className="fw-400 fs-18 links-darkColor d-inline-block">
								{item.mission.title}
							</h4>
						</a>
					</Link>
					<div className="divider-20" />
					<MissionItemContent mission={item.mission} />
					<div className="divider-20" />
					<MissionItemAuthor user={item.mission.user} />
				</div>
				<hr />
				<div className="divider-30" />
				<ProposalDescription item={item} />
				<div className="divider-20" />
				<ButtonGroup>
					<Button className="rs-btn-main" onClick={lintToProposal}>
						read more
					</Button>
				</ButtonGroup>
			</div>
		</>
	);
};

export default ProposalItem;
