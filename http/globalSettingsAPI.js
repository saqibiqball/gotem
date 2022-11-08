import { $authHost } from './index';

export const getDisputeEmail = async () => {
	const { data } = await $authHost.get('api/settings/');
	return data.message;
};

export const changeDisputeEmail = async (formData) => {
	const { data } = await $authHost.put('api/settings/', formData);
	return data.message;
};
