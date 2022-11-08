import React, { useContext, useMemo } from 'react';
import { ProposalContext } from '@/context/proposal';

const AcceptOfferHeader = () => {
	const [proposal] = useContext(ProposalContext);
	const activeAmountMilestone = useMemo(() => {
		return (
			proposal?.milestones?.find(
				(milestone) => milestone.statusId === 2 || milestone.statusId === 3
			)?.amount || 0
		);
	}, [proposal?.milestones]);

	const sumPaidMilestones = useMemo(() => {
		return proposal?.milestones
			?.filter((milestone) => milestone.statusId === 4 || milestone.statusId === 5)
			.reduce((acc, el) => acc + el.amount, 0);
	}, [proposal?.milestones]);

	return (
		<>
			{Object.keys(proposal).length > 0 && (
				<div className="ls accept-offer-header">
					<div className="accept-offer-header__item">
						<h5>${proposal.amount.toFixed(2)}</h5>

						<span>Budget</span>
					</div>
					<div className="accept-offer-header__item">
						<h5>${activeAmountMilestone.toFixed(2)}</h5>
						<span>In Escrow</span>
					</div>
					<div className="accept-offer-header__item">
						<h5>${sumPaidMilestones.toFixed(2)}</h5>
						<span>Milestones Paid</span>
					</div>
					<div className="accept-offer-header__item">
						<h5>
							$
							{(
								proposal.amount -
								(sumPaidMilestones + activeAmountMilestone)
							).toFixed(2)}
						</h5>
						<span>Remaining</span>
					</div>
					<div className="accept-offer-header__item">
						<h5>${(sumPaidMilestones + activeAmountMilestone).toFixed(2)}</h5>
						<span>Total Earnings</span>
					</div>
				</div>
			)}
		</>
	);
};

export default AcceptOfferHeader;
