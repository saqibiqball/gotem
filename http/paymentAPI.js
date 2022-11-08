import { $authHost } from './index';

export const createPaymentIntent = async (formData) => {
	const { data } = await $authHost.post('api/payment/create-payment-intent', formData);
	return data.message;
};
