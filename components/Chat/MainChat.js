import React, { useContext } from 'react';
import MainChatHeader from '@/components/Chat/MainChatHeader';
import MainChatContent from '@/components/Chat/MainChatContent';
import MainChatForm from '@/components/Chat/MainChatForm';
import { ChatContext } from '@/context/chat';

const MainChat = () => {
	const { activeChat, messages } = useContext(ChatContext);

	return (
		<div className="mwt-chat-main">
			{Object.keys(activeChat).length > 0 && <MainChatHeader />}
			<MainChatContent />
			{messages.length > 0 && (
				<>
					<MainChatForm />
				</>
			)}
		</div>
	);
};

export default MainChat;
