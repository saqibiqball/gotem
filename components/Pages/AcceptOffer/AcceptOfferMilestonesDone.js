import React, { useContext, useMemo } from 'react';
import { Panel } from 'rsuite';
import MilestonesDoneHeader from '@/components/Pages/AcceptOffer/MilestonesDoneHeader';
import AcceptOfferMilestonesItem from '@/components/Pages/AcceptOffer/AcceptOfferMilestonesItem';
import { ProposalContext } from '@/context/proposal';

const AcceptOfferMilestonesDone = () => {
	const [proposal] = useContext(ProposalContext);

	const milestonesDone = useMemo(() => {
		if (Object.keys(proposal).length > 0) {
			return proposal.milestones.filter(
				(milestone) => milestone.statusId === 4 || milestone.statusId === 5
			);
		}
		return [];
	}, [proposal]);
	return (
		<Panel
			className="accept-offer__milsestones"
			header={<MilestonesDoneHeader count={milestonesDone.length} />}
			collapsible
		>
			<ul>
				{milestonesDone.map((milestone) => {
					return <AcceptOfferMilestonesItem key={milestone.id} milestone={milestone} />;
				})}
			</ul>
		</Panel>
	);
};

export default AcceptOfferMilestonesDone;
