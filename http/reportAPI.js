import { $authHost } from './index';

export const makeReport = async (formData) => {
	const { data } = await $authHost.post('api/reports/make-report', formData);
	return data.message;
};
