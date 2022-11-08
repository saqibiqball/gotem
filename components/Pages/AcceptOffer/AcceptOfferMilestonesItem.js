import React from 'react';
import AcceptOfferMilestonesButtonsUser from '@/components/Pages/AcceptOffer/AcceptOfferMilestonesButtonsUser';
import { useSelector } from 'react-redux';
import AcceptOfferMilestonesButtonsSourcer from '@/components/Pages/AcceptOffer/AcceptOfferMilestonesButtonsSourcer';

const AcceptOfferMilestonesItem = ({ milestone }) => {
	const { currentUser } = useSelector((state) => state.user);
	const isDispute = milestone.statusId === 5;
	return (
		<li key={milestone.id} className={'milesestone-item ' + (isDispute ? 'has-dispute' : '')}>
			<div className="milesestone-item-header">
				<h6 className="fs-16">{milestone.title}</h6>
				{currentUser.roleId === 3 ? (
					<AcceptOfferMilestonesButtonsSourcer milestone={milestone} />
				) : (
					<AcceptOfferMilestonesButtonsUser milestone={milestone} />
				)}
			</div>
			<div className="milesestone-item-price">
				<span>${milestone.amount}</span>
				<span>({milestone?.status?.name})</span>
			</div>
		</li>
	);
};

export default AcceptOfferMilestonesItem;
