import React, { useState } from 'react';

export const ChatGroupContext = React.createContext();

const ChatGroupProvider = ({ children }) => {
	const [isGroupChatOpen, setIsGroupChatOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [activeUsers, setActiveUsers] = useState([]);

	return (
		<ChatGroupContext.Provider
			value={{
				messages,
				setMessages,
				activeUsers,
				setActiveUsers,
				isGroupChatOpen,
				setIsGroupChatOpen,
			}}
		>
			{children}
		</ChatGroupContext.Provider>
	);
};

export default ChatGroupProvider;
