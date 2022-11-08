import { $authHost } from './index';

// Chat http
export const addNewPrivateChat = async (formData) => {
	const { data } = await $authHost.post(`api/chat/`, formData);
	return data.message;
};

export const getAllPrivateChats = async () => {
	const { data } = await $authHost.get(`api/chat/`);
	return data.message;
};

export const getAllMessagesOfPrivateChat = async (id) => {
	const { data } = await $authHost.get(`api/chat/${id}`);
	return data.message;
};

export const getUnreadMessagesCount = async () => {
	const { data } = await $authHost.get(`api/chat/count-unread-messages`);
	return data.message;
};

export const getUnreadMessagesForEachChatCount = async () => {
	const { data } = await $authHost.get(`api/chat/count-unread-messages-for-each-chat`);
	return data.message;
};

export const changeMessagesToRead = async (formData) => {
	const { data } = await $authHost.put(`api/chat/reade-messages`, formData);
	return data.message;
};

export const getAllMessagesOfGroupChat = async () => {
	const { data } = await $authHost.get(`api/chat/group`);
	return data.message;
};

export const addMessageToGroupChat = async (formData) => {
	const { data } = await $authHost.post(`api/chat/group`, formData);
	return data.message;
};

// eof Message http
