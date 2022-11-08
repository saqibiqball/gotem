import React, { useMemo } from 'react';
import More from '@/components/UI/More';

const ProposalDescription = ({ item }) => {
	const retainerAmountPercent = useMemo(() => {
		if (item.retainerAmount) {
			return Math.ceil((item.retainerAmount / item.amount) * 100);
		}
		return 0;
	}, [item]);

	return (
		<div className="content">
			<h6 className="fs-16">Full description</h6>
			<More elem={item} text={item.description} number={350} />

			<h6 className="fs-16 mt-20">Mission amount</h6>
			<div className="mb-0">
				<span className="mr-10">Amount:</span>
				<span className="color-main2">${item.amount}</span>
			</div>
			{item.retainerAmount && (
				<div>
					<span className="mr-10">Retainer amount:</span>
					<span className="color-main2">
						${item.retainerAmount} ({retainerAmountPercent}%)
					</span>
				</div>
			)}
			<h6 className="fs-16 mt-20">
				Status: <span className="color-main2 fw-400">{item.status?.name}</span>
			</h6>
		</div>
	);
};

export default ProposalDescription;
