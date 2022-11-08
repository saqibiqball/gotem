import React from 'react';

export const ADMIN_NAVIGATION = (slug) => {
	return [
		{
			title: 'Dashboard',
		},
		{
			href: `/dashboard-admin/${slug}`,
			title: 'Dashboard',
			icon: <i className="ico ico-View-grid rs-icon" />,
		},
		{
			href: `/dashboard-admin/${slug}/users`,
			title: 'Users',
			icon: <i className="ico ico-Users rs-icon" />,
		},
		{
			href: `/dashboard-admin/${slug}/missions`,
			title: 'Missions',
			icon: <i className="ico ico-Cube rs-icon" />,
		},
		{
			href: `/dashboard-admin/${slug}/transactions`,
			title: 'Transactions',
			icon: <i className="ico ico-Currency-Dollar rs-icon" />,
		},
		{
			href: `/dashboard-admin/${slug}/disputes`,
			title: 'Disputes',
			icon: <i className="ico ico-Exclamation rs-icon" />,
		},
	];
};
//source-catalog
export const SOURCE_NAVIGATION = (slug) => {
	return [
		{
			title: 'Dashboard',
		},
		{
			href: `/dashboard-source/${slug}`,
			title: 'Dashboard',
			icon: <i className="ico ico-View-grid rs-icon" />,
		},
		{
			href: `/dashboard-source/${slug}/source-catalog`,
			title: 'Sources',
			icon: <i className="ico ico-View-boards rs-icon" />,
		},
		{
			href: `/dashboard-source/${slug}/bookmarks`,
			title: 'Saved',
			icon: <i className="ico ico-Bookmark-alt rs-icon" />,
		},
		{
			href: `/dashboard-source/${slug}/my-proposals`,
			title: 'My proposals',
			icon: <i className="ico ico-Collection rs-icon" />,
		},
		{
			href: `/dashboard-source/${slug}/payments`,
			title: 'Payments',
			icon: <i className="ico ico-Currency-Dollar rs-icon" />,
		},
		{
			href: `/dashboard-source/${slug}/settings`,
			title: 'Settings',
			icon: <i className="ico ico-Cog rs-icon" />,
			default: true,
			children: [
				{
					href: `/dashboard-source/${slug}/settings/change-password`,
					title: 'Change Password',
					icon: <i className="ico ico-Users rs-icon" />,
				},
			],
		},
		{
			title: 'Missions',
		},
		{
			href: `/dashboard-source/${slug}/mission-catalog`,
			title: 'Browse',
			icon: <i className="ico ico-Cube rs-icon" />,
		},
	];
};

export const USER_NAVIGATION = (slug) => {
	return [
		{
			title: 'Dashboard',
		},
		{
			href: `/dashboard-user/${slug}`,
			title: 'Dashboard',
			icon: <i className="ico ico-View-grid rs-icon" />,
		},
		{
			href: `/dashboard-user/${slug}/source-catalog`,
			title: 'Browse All Sources',
			icon: <i className="ico ico-View-boards rs-icon" />,
		},
		{
			href: `/dashboard-user/${slug}/bookmarks`,
			title: 'Saved',
			icon: <i className="ico ico-Bookmark-alt rs-icon" />,
		},
		{
			href: `/dashboard-user/${slug}/payments`,
			title: 'Payments',
			icon: <i className="ico ico-Currency-Dollar rs-icon" />,
		},
		{
			href: `/dashboard-user/${slug}/settings`,
			title: 'Settings',
			icon: <i className="ico ico-Cog rs-icon" />,
			default: true,
			children: [
				{
					href: `/dashboard-user/${slug}/settings/change-password`,
					title: 'Change Password',
					icon: <i className="ico ico-Users rs-icon" />,
				},
			],
		},
		{
			title: 'Missions',
		},
		{
			href: `/dashboard-user/${slug}/my-missions`,
			title: 'My cases',
			icon: <i className="ico ico-Cube rs-icon" />,
		},
	];
};
