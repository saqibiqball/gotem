import React from 'react';
import { Button } from 'rsuite';
import More from '@/components/UI/More';

const MilestonesInProposalItem = ({ milestone, onDelete, onEdit }) => {
	return (
		<div className="milestone pl-25 pt-25 pr-25 pb-15 ls ms mb-20">
			<div className="d-flex justify-content-between align-start">
				<div className="d-flex d-wrap flex-column">
					<h6 className="fs-16 mr-auto pr-10 fw-400 mb-5">{milestone.title}</h6>
					<span className="color-main2 d-in-flex mb-5">${milestone.amount}</span>
				</div>
				<div className="d-flex">
					<Button className="btn-icon" onClick={() => onEdit(milestone)}>
						<i className="ico ico-Pencil fs-20" />
					</Button>
					<Button className="btn-icon" onClick={() => onDelete(milestone.id)}>
						<i className="ico ico-Trash fs-20 ml-5" />
					</Button>
				</div>
			</div>
			<More
				text={milestone.description}
				elem={milestone}
				number={250}
				color={'color-darkGreyColor'}
			/>
		</div>
	);
};

export default MilestonesInProposalItem;
