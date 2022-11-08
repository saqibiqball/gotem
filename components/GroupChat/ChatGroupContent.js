import React, { useContext, useEffect, useRef } from 'react';
import ChatGroupContentUserItem from '@/components/GroupChat/ChatGroupContentUserItem';
import { ChatGroupContext } from '@/context/chat-group';

const ChatGroupContent = () => {
	const { messages } = useContext(ChatGroupContext);
	const scrollRef = useRef();

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ block: 'nearest' });
	}, [messages]);
	return (
		<div className="mwt-chat-group-content">
			{messages.map((msg) => (
				<ChatGroupContentUserItem key={msg.id} message={msg} scroll={scrollRef} />
			))}
		</div>
	);
};

export default ChatGroupContent;
