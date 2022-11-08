import { $authHost } from './index';

export const getAllTransactions = async (limit, pageActive) => {
	const { data } = await $authHost.get('api/transaction/', {
		params: { limit, page: pageActive },
	});
	return data.message;
};

export const getTransactionsForUser = async (limit, pageActive) => {
	const { data } = await $authHost.get('api/transaction/user', {
		params: { limit, page: pageActive },
	});
	return data.message;
};

export const getTransactionsForFreelancer = async (limit, pageActive) => {
	const { data } = await $authHost.get('api/transaction/freelancer', {
		params: { limit, page: pageActive },
	});
	return data.message;
};

export const addTransaction = async (fromData) => {
	const { data } = await $authHost.post('api/transaction/', fromData);
	return data.message;
};
