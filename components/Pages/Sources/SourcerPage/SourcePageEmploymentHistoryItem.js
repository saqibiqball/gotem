import React from 'react';
import { Button } from 'rsuite';
import { useSelector } from 'react-redux';

const SourcePageEmploymentHistoryItem = ({ employment, openModalToEdit, deleteItem, userId }) => {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div className="employment-history-item">
			<div className="employment-history-item-header">
				<div className="d-flex justify-content-between">
					<h6 className="h-small color-main">{employment.name}</h6>
					{currentUser.id === userId && (
						<div>
							<Button
								className="btn-icon"
								onClick={() => openModalToEdit(employment)}
							>
								<i className="ico ico-Pencil1 fs-18"></i>
							</Button>
							<Button className="btn-icon" onClick={() => deleteItem(employment.id)}>
								<i className="ico ico-Trash fs-18 ml-20"></i>
							</Button>
						</div>
					)}
				</div>

				<div className="employment-history-item-meta">
					<span className="employment-history-item-meta-date">
						{employment.monthFrom} {employment.yearFrom} -{' '}
						{employment.isPresent
							? 'Present'
							: employment.monthTo + ' ' + employment.yearTo}
					</span>
				</div>
				<div className="employment-history-item-content">
					<p>{employment.description}</p>
				</div>
			</div>
		</div>
	);
};

export default SourcePageEmploymentHistoryItem;
