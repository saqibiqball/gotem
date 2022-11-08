import { $authHost, $host } from '@/http/index';

export const getAllPropertiesOfUsers = async () => {
	const { data } = await $authHost.get('api/user/get-all-properties');
	return data.message;
};

export const getAllUsersInList = async () => {
	const { data } = await $authHost.get(`api/user/users-list`);
	return data.message;
};

export const registration = async (formData) => {
	const { data } = await $host.post('api/user/registration', formData);
	return data.message;
};

export const verification = async (formData) => {
	const { data } = await $host.post('api/user/verification', formData);
	return data.message;
};

export const login = async ({ email, password, remember }) => {
	const { data } = await $host.post('api/user/login', { email, password });

	localStorage.removeItem('token');
	sessionStorage.removeItem('token');
	remember
		? localStorage.setItem('token', data.message.token)
		: sessionStorage.setItem('token', data.message.token);
	return data.message.user;
};

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth');
	if (localStorage.getItem('token')) localStorage.setItem('token', data.message.token);
	if (sessionStorage.getItem('token')) sessionStorage.setItem('token', data.message.token);
	return data.message.user;
};

export const lostPassword = async (email) => {
	const { data } = await $host.post('api/user/lost-password', { email });
	return data.message;
};

export const resetPassword = async (link = '', password = '') => {
	const { data } = await $host.post('api/user/reset-password', { link, password });
	return data.message;
};

export const getUser = async (id) => {
	const { data } = await $host.get(`api/user/get-user/${id}`);
	return data.message;
};

export const getCategories = async () => {
	const { data } = await $host.get(`api/user/categories/`);
	return data.message;
};

export const getUserPage = async (slug) => {
	const { data } = await $host.get(`api/user/get-user-page/${slug}`);
	return data.message;
};

export const updateUser = async (formData) => {
	const { data } = await $authHost.put(`api/user/update-user`, formData);
	return data.message;
};

export const deleteUser = async (id) => {
	const { data } = await $authHost.delete(`api/user/delete-user/${id}`);
	return data.message;
};

export const getAllUsers = async ({ status, search, dateFrom, dateTo, role, page, limit }) => {
	const { data } = await $authHost.get(`api/user/get-all-users`, {
		params: { status, search, dateFrom, dateTo, role, page, limit },
	});
	return data.message;
};

export const getSourcesByMissionCats = async (queryData, id) => {
	const { data } = await $authHost.get(`api/user/get-sources-by-cats/${id}`, {
		params: queryData,
	});
	return data.message;
};

export const isSourcerFetch = async (link) => {
	const { data } = await $host.get(`api/user/is-sourcer`, {
		params: { link },
	});
	return data.message;
};

export const getSources = async (queryData) => {
	const { data } = await $host.get(`api/user/get-all-sources`, {
		params: { ...queryData },
	});
	return data.message;
};

export const getRoles = async () => {
	const { data } = await $host.get(`api/user/roles`);
	return data.message;
};
export const getRolesWithOutAdmin = async () => {
	const { data } = await $host.get(`api/user/roles-without-admin`);
	return data.message;
};
export const getStatuses = async () => {
	const { data } = await $host.get(`api/user/statuses`);
	return data.message;
};

export const userAddToFavorites = async (id) => {
	const { data } = await $authHost.get(`api/user/add-to-favorites`, {
		params: { id },
	});
	return data.message;
};

export const getAllDoneMissionsWithReviews = async (id) => {
	const { data } = await $authHost.get(`api/user/get-done-missions-with-reviews/${id}`);
	return data.message;
};

export const getUserFeedback = async (id) => {
	const { data } = await $authHost.get(`api/user/get-user-feedback/${id}`);
	return data.message;
};

export const userAddEmployment = async (formData) => {
	const { data } = await $authHost.post(`api/user/add-employment`, formData);
	return data.message;
};

export const userUpdateEmployment = async (formData) => {
	const { data } = await $authHost.put(`api/user/add-employment`, formData);
	return data.message;
};

export const deleteUserEmployment = async (id) => {
	const { data } = await $authHost.delete(`api/user/delete-employment/${id}`);
	return data.message;
};

export const addReview = async (formData) => {
	const { data } = await $authHost.post(`api/user/add-review`, formData);
	return data.message;
};
