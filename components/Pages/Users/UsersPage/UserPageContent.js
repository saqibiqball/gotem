import React from 'react';
import UserPageTabs from '@/components/Pages/Users/UsersPage/UserPageTabs';

const UserPageContent = ({ user }) => {
	return <UserPageTabs user={user} />;
};

export default UserPageContent;
