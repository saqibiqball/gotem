import React from 'react';
import SourcePageFeedback from '@/components/Pages/Sources/SourcerPage/SourcePageFeedback';

const SourcerCompletedJobs = ({ feedbackCompleted }) => {
	return (
		<>
			{feedbackCompleted.rows.map((proposal) => (
				<SourcePageFeedback key={proposal.id} proposal={proposal} />
			))}
		</>
	);
};

export default SourcerCompletedJobs;
