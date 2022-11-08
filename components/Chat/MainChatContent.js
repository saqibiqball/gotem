import React, { useContext, useEffect, useRef } from 'react';
import MainChatContentUserItem from '@/components/Chat/MainChatContentUserItem';
import { ChatContext } from '@/context/chat';

const MainChatContent = () => {
	const { messages } = useContext(ChatContext);
	const scrollRef = useRef();

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ block: 'nearest' });
	}, [messages]);

	return (
		<div className="mwt-chat-main-content">
			{messages.length > 0 &&
				messages.map((msg) => (
					<MainChatContentUserItem key={msg.id} scroll={scrollRef} message={msg} />
				))}
		</div>
	);
};

export default MainChatContent;
