import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import { ChatGroupContext } from '@/context/chat-group';

const ChatGroupContentUserItem = ({ scroll, message }) => {
	const { activeUsers } = useContext(ChatGroupContext);

	const isActiveUser = useMemo(() => {
		if (activeUsers.length > 0 && 'id' in message.sender) {
			return activeUsers.some((el) => el === message.sender.id);
		}
		return false;
	}, [activeUsers, message.sender]);

	return (
		<div ref={scroll} className="mwt-chat-group-user-item">
			<div className="mwt-chat-group-user-item__media">
				<Image
					quality={100}
					width={24}
					height={24}
					src={process.env.NEXT_PUBLIC_API_URL + message.sender.photo}
					objectFit="cover"
					alt="avatar"
				/>
				<span
					className={'mwt-chat-group-user-item__status ' + (isActiveUser ? 'active' : '')}
				/>
			</div>
			<div className="mwt-chat-group-user-item__content">
				<div className="mwt-chat-group-user-item__text d-flex">
					<p className="mr-auto pr-5">
						<span>{message.sender.firstName + ' ' + message.sender.lastName}</span>{' '}
						{message.content}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatGroupContentUserItem;
