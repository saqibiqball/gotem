import React, { useContext, useEffect, useMemo } from 'react';
import SidebarChatUserItem from '@/components/Chat/SidebarChatUserItem';
import CustomNotice from '@/components/UI/CustomNotice';
import { getAllMessagesOfPrivateChat, getUnreadMessagesForEachChatCount } from '@/http/chatAPI';
import { ChatContext } from '@/context/chat';
import { SocketContext } from '@/context/socket';
import { useSelector } from 'react-redux';

const SidebarChatUsers = ({ chats }) => {
	const socket = useContext(SocketContext);
	const {
		setIsSidebarOpen,
		setMessages,
		setActiveChat,
		activeChat,
		setChats,
		activeUsers,
		setActiveUsers,
		setUnreadMessages,
	} = useContext(ChatContext);
	const { currentUser } = useSelector((state) => state.user);

	const receiver = useMemo(() => {
		if (Object.keys(activeChat).length) {
			return activeChat.receiverId === currentUser.id
				? activeChat.sender
				: activeChat.receiver;
		}
		return {};
	}, [activeChat, currentUser]);

	const fetchData = async () => {
		try {
			return await getUnreadMessagesForEachChatCount();
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	const onGetMessage = ({ message, chatPrivateId }) => {
		setChats((prev) => {
			const clone = [...prev];
			const needChat = clone.find((ch) => ch.id === chatPrivateId);
			needChat.lastMessage = message.content;
			needChat.updatedAt = new Date();
			return [...clone];
		});
		setMessages((prev) => {
			if (prev.length > 0 && prev[0].chatPrivateId === chatPrivateId) {
				return [...prev, message];
			}
			return [...prev];
		});
	};

	const onReadMessagesForCurrentChat = () => {
		setMessages((prev) => prev.map((msg) => ({ ...msg, isRead: true })));
	};

	const onGetActiveUsers = (usersIds) => {
		setActiveUsers(usersIds);
	};

	useEffect(() => {
		fetchData().then(setUnreadMessages);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		socket.emit('getOnlineUsers', onGetActiveUsers);
		socket.on('updateUnreadMessages', () => {
			fetchData().then(setUnreadMessages);
		});

		socket.on('getUsers', onGetActiveUsers);
		socket.on('getMessage', onGetMessage);
		socket.on('readMessagesForCurrentChatToClient', onReadMessagesForCurrentChat);

		return () => {
			socket.off('getUsers', onGetActiveUsers);
			socket.off('getMessage', onGetMessage);
			socket.off('readMessagesForCurrentChatToClient', onReadMessagesForCurrentChat);
		};
		// eslint-disable-next-line
	}, [socket]);

	const getMessages = async (chatItem) => {
		try {
			const chatData = await getAllMessagesOfPrivateChat(chatItem.id);
			setMessages(chatData);
			setActiveChat(chatItem);

			socket.emit('readMessagesForCurrentChat', {
				receiverId: receiver.id,
				senderId: currentUser.id,
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setIsSidebarOpen(false);
	};

	return (
		<div className="mwt-chat-sidebar-users-list">
			{chats.map((chatItem) => (
				<SidebarChatUserItem
					key={chatItem.id}
					chat={chatItem}
					activeUsers={activeUsers}
					getMessages={() => getMessages(chatItem)}
				/>
			))}
		</div>
	);
};

export default SidebarChatUsers;
