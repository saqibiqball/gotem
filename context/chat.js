import React, { useState } from 'react';

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [activeChat, setActiveChat] = useState({});
	const [chats, setChats] = useState([]);
	const [activeUsers, setActiveUsers] = useState([]);
	const [unreadMessages, setUnreadMessages] = useState([]);

	return (
		<ChatContext.Provider
			value={{
				isSidebarOpen,
				setIsSidebarOpen,
				messages,
				setMessages,
				activeChat,
				setActiveChat,
				chats,
				setChats,
				activeUsers,
				setActiveUsers,
				setUnreadMessages,
				unreadMessages,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatProvider;
