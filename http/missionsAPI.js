import { $authHost, $host } from './index';

export const getAllPropertiesOfMission = async () => {
	const { data } = await $authHost.get('api/missions/get-all-properties');
	return data.message;
};
export const addMission = async (formData) => {
	const { data } = await $authHost.post('api/missions/add-mission', formData);
	return data.message;
};

export const getMission = async (id) => {
	const { data } = await $authHost.get(`api/missions/get-mission/${id}`);
	return data.message;
};

export const checkHasProposal = async (id) => {
	const { data } = await $authHost.get(`api/missions/check-has-proposal`, {
		params: { id },
	});
	return data.message;
};

export const getMissionInfo = async (id) => {
	const { data } = await $host.get(`api/missions/get-mission-info/${id}`);
	return data.message;
};

export const updateMission = async (formData) => {
	const { data } = await $authHost.put(`api/missions/update-mission`, formData);
	return data.message;
};

export const deleteMission = async (id) => {
	const { data } = await $authHost.delete(`api/missions/delete-mission/${id}`);
	return data.message;
};

export const getAllMissions = async (queryData) => {
	const { data } = await $host.get(`api/missions/get-all-missions`, {
		params: queryData,
	});
	return data.message;
};
export const getAllMissionsWithOutQuery = async () => {
	const { data } = await $host.get(`api/missions/get-all-missions-without-query`);
	return data.message;
};

export const AddToFavoritesMission = async (id) => {
	const { data } = await $authHost.get(`api/missions/add-to-favorites`, {
		params: { id },
	});
	return data.message;
};
