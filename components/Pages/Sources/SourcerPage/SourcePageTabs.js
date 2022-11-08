import React, { useState } from 'react';
import { Nav } from 'rsuite';
import SourcerCompletedJobs from '@/components/Pages/Sources/SourcerPage/SourcerCompletedJobs';
import SourcerInProgressJobs from '@/components/Pages/Sources/SourcerPage/SourcerInProgressJobs';

const SourcePageTabs = ({ feedbackCompleted, feedbackInProgress }) => {
	const [active, setActive] = useState('completed_jobs');
	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};
	return (
		<div className="sourcer-page-tabs">
			<Nav activeKey={active} className="wrap" onSelect={handleSelect}>
				<Nav.Item eventKey="completed_jobs">
					Completed jobs (<span>{feedbackCompleted.count})</span>
				</Nav.Item>
				<Nav.Item eventKey="in_progress_jobs">
					In progress<span>(5)</span>
				</Nav.Item>
			</Nav>
			<div className="content pt-30">
				{active === 'completed_jobs' && (
					<SourcerCompletedJobs feedbackCompleted={feedbackCompleted} />
				)}
				{active === 'in_progress_jobs' && (
					<SourcerInProgressJobs feedbackInProgress={feedbackInProgress} />
				)}
			</div>
		</div>
	);
};

export default SourcePageTabs;
