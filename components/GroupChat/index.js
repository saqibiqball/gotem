import React from 'react';
import ChatGroupProvider from '@/context/chat-group';
import ChatGroupWrapper from '@/components/GroupChat/ChatGroupWrapper';

const Index = () => {
	return (
		<>
			<ChatGroupProvider>
				<ChatGroupWrapper />
			</ChatGroupProvider>
		</>
	);
};

export default Index;
