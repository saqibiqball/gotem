import React, { useContext, useEffect } from 'react';
import { Button } from 'rsuite';
import ChatGroupHeader from '@/components/GroupChat/ChatGroupHeader';
import ChatGroupContent from '@/components/GroupChat/ChatGroupContent';
import ChatGroupForm from '@/components/GroupChat/ChatGroupForm';
import { ChatGroupContext } from '@/context/chat-group';
import CustomNotice from '@/components/UI/CustomNotice';
import { getAllMessagesOfGroupChat } from '@/http/chatAPI';
import { SocketContext } from '@/context/socket';

const ChatGroupWrapper = () => {
	const { isGroupChatOpen, setIsGroupChatOpen, setMessages, setActiveUsers } =
		useContext(ChatGroupContext);
	const socket = useContext(SocketContext);

	const onGetActiveUsers = (usersIds) => {
		setActiveUsers(usersIds);
	};

	const onGetGroupMessage = (msg) => {
		setMessages((prev) => [...prev, msg]);
	};

	useEffect(() => {
		socket.emit('getOnlineUsers', onGetActiveUsers);

		socket.on('getUsers', onGetActiveUsers);
		socket.on('getMessageFromGroupChat', onGetGroupMessage);

		return () => {
			socket.off('getUsers', onGetActiveUsers);
			socket.off('getMessageFromGroupChat', onGetGroupMessage);
		};
		// eslint-disable-next-line
	}, [socket]);

	const handlerOpenGroupChat = async () => {
		try {
			setIsGroupChatOpen(true);
			const msgs = await getAllMessagesOfGroupChat();
			setMessages(msgs);
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	return (
		<div className="mwt-chat-group">
			{!isGroupChatOpen && (
				<div className="mwt-chat-group-toggle">
					<Button onClick={handlerOpenGroupChat}>
						<i className="ico-Chat-alt-3" />
					</Button>
				</div>
			)}

			{isGroupChatOpen && (
				<>
					<ChatGroupHeader />
					<ChatGroupContent />
					<ChatGroupForm />
				</>
			)}
		</div>
	);
};

export default ChatGroupWrapper;
