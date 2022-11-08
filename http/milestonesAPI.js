import { $authHost } from './index';

export const changeStatusMilestone = async (formData) => {
	const { data } = await $authHost.put('api/milestones/change-status', formData);
	return data.message;
};
