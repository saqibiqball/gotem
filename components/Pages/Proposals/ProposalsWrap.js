import React from 'react';
import ProposalItem from '@/components/Pages/Proposals/ProposalItem';

const ProposalsWrap = ({ items }) => {
	return (
		<>
			{items.map((item) => (
				<ProposalItem key={'proposals_' + item.id} item={item} />
			))}
		</>
	);
};

export default ProposalsWrap;
