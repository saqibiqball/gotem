import React, { useContext, useMemo } from 'react';
import { Panel } from 'rsuite';
import MilestonesActiveHeader from '@/components/Pages/AcceptOffer/MilestonesActiveHeader';
import AcceptOfferMilestonesItem from '@/components/Pages/AcceptOffer/AcceptOfferMilestonesItem';
import { ProposalContext } from '@/context/proposal';

const AcceptOfferMilestonesInWork = () => {
	const [proposal] = useContext(ProposalContext);

	const milestonesInWork = useMemo(() => {
		if (Object.keys(proposal).length > 0) {
			return proposal.milestones.filter(
				(milestone) => milestone.statusId !== 4 && milestone.statusId !== 5
			);
		}
		return [];
	}, [proposal]);

	return (
		<Panel
			className="accept-offer__milsestones"
			header={<MilestonesActiveHeader />}
			collapsible
			defaultExpanded
		>
			<ul>
				{milestonesInWork.map((milestone) => {
					return <AcceptOfferMilestonesItem key={milestone.id} milestone={milestone} />;
				})}
			</ul>
		</Panel>
	);
};

export default AcceptOfferMilestonesInWork;
