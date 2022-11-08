import React from 'react';
import UserPageFeedbacksItem from '@/components/Pages/Users/UsersPage/UserPageFeedbacksItem';

const UserPageFeedbacks = ({ feedbacks }) => {
	return (
		<>
			{feedbacks.rows.map((f) => (
				<UserPageFeedbacksItem key={f.id} feedback={f} />
			))}
		</>
	);
};

export default UserPageFeedbacks;
