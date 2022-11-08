import React from 'react';
import MyProposalItem from '@/components/Pages/Proposals/MyProposalItem';

const ProposalsWrap = ({ items }) => {
	return (
		<>
			{items.map((item) => (
				<MyProposalItem key={'proposals_' + item.id} item={item} />
			))}
		</>
	);
};

export default ProposalsWrap;
