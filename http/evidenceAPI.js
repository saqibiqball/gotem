import { $authHost } from './index';

export const createEvidence = async (formData) => {
	const { data } = await $authHost.post('api/evidences/', formData);
	return data.message;
};

export const updateEvidence = async (formData) => {
	const { data } = await $authHost.put('api/evidences/', formData);
	return data.message;
};
