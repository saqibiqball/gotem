import { $authHost } from './index';

export const getDisputes = async () => {
	const { data } = await $authHost.get('api/disputes/');
	return data.message;
};

export const addDispute = async (formData) => {
	const { data } = await $authHost.post('api/disputes/', formData);
	return data.message;
};

export const updateDispute = async (formData) => {
	const { data } = await $authHost.put('api/disputes/', formData);
	return data.message;
};
