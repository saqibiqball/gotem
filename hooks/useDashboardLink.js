import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function useDashboardLink() {
	const { currentUser } = useSelector((state) => state.user);

	return useMemo(() => {
		let link = '';
		if ('roleId' in currentUser) {
			switch (currentUser.roleId) {
				case 1:
					link = `/dashboard-admin/${currentUser.slug}`;
					break;
				case 2:
					link = `/dashboard-user/${currentUser.slug}`;
					break;
				case 3:
					link = `/dashboard-source/${currentUser.slug}`;
					break;
			}
		}
		return link;
	}, [currentUser]);
}
