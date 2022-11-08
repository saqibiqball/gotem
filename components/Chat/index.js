import React from 'react';
import SidebarChat from '@/components/Chat/SidebarChat';
import MainChat from '@/components/Chat/MainChat';
import ChatProvider from '@/context/chat';

const Chat = () => {
	return (
		<div className="mwt-chat">
			<ChatProvider>
				<SidebarChat />
				<MainChat />
			</ChatProvider>
		</div>
	);
};

export default Chat;
