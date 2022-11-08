import React from 'react';
import More from '@/components/UI/More';

const ProposalMilestones = ({ milestones = [] }) => {
	return (
		<>
			{milestones.length > 0 && (
				<div className="mt-20">
					<h6 className="fs-16">Milestones</h6>
					{milestones.map((item) => (
						<div
							key={`milestone_${item.id}`}
							className="milestone pl-25 pt-25 pr-25 pb-15 ls ms mb-20"
						>
							<div className="d-flex d-wrap">
								<h6 className="fs-16 mr-auto pr-10 fw-400 mb-5">{item.title}</h6>
								<span className="color-main2 d-in-flex mb-5">${item.amount}</span>
							</div>
							<More
								text={item.description}
								elem={item}
								number={250}
								color={'color-darkGreyColor'}
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default ProposalMilestones;
