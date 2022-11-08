const checkUser = (user, router) => {
	if (
		(!user.isAuth && user.fetchUser) ||
		(!localStorage.getItem('token') && !sessionStorage.getItem('token'))
	) {
		router.push('/');
	}
	if (Object.keys(user.currentUser).length > 0) {
		const dashboardName = router.asPath.split('/')[1];
		const role = user.currentUser.roleId;
		const status = user.currentUser.statusId;
		switch (dashboardName) {
			case 'dashboard-admin':
				role !== 1 && router.push('/');
				break;
			case 'dashboard-source':
				if (status !== 1) {
					router.push(`/dashboard-source/${user.currentUser.slug}/settings`);
				}
				role !== 3 && router.push('/');
				break;
			case 'dashboard-user':
				role !== 2 && router.push('/');
				break;
		}
	}
};

export default checkUser;
