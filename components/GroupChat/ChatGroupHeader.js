import React, { useContext } from 'react';
import { Button } from 'rsuite';
import { ChatGroupContext } from '@/context/chat-group';
import CollapseIcon from '@/components/Svg/CollapseIcon';

const ChatGroupHeader = () => {
	const { setIsGroupChatOpen } = useContext(ChatGroupContext);

	return (
		<div className="mwt-chat-group-header">
			<h6>
				<i className="ico-View-grid fs-24 mr-10" /> Last Messages
			</h6>

			<div className="mwt-chat-group-toggle">
				<Button onClick={() => setIsGroupChatOpen(false)}>
					<CollapseIcon />
				</Button>
			</div>
		</div>
	);
};

export default ChatGroupHeader;
