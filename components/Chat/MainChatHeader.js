import React, { useContext, useMemo } from 'react';
import MainChatHeaderUserItem from '@/components/Chat/MainChatHeaderUserItem';
import { ChatContext } from '@/context/chat';
import { useSelector } from 'react-redux';

const MainChatHeader = () => {
	const { activeChat } = useContext(ChatContext);
	const { currentUser } = useSelector((state) => state.user);
	const receiver = useMemo(() => {
		if (Object.keys(activeChat).length) {
			return activeChat.receiverId === currentUser.id
				? activeChat.sender
				: activeChat.receiver;
		}
		return {};
	}, [activeChat, currentUser]);
	return (
		<div className="mwt-chat-main-header">
			<MainChatHeaderUserItem receiver={receiver} />
			{/*<MainChatHeaderDropdown receiver={receiver} />*/}
		</div>
	);
};

export default MainChatHeader;
