import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import { ChatContext } from '@/context/chat';

const MainChatHeaderUserItem = ({ receiver }) => {
	const { activeUsers } = useContext(ChatContext);

	const isActiveUser = useMemo(() => {
		if (activeUsers.length > 0 && 'id' in receiver) {
			return activeUsers.some((el) => el === receiver.id);
		}
		return false;
	}, [activeUsers, receiver]);

	return (
		<div className="mwt-chat-user-item">
			<div className="mwt-chat-user-item__media">
				<Image
					quality={100}
					width={40}
					height={40}
					src={process.env.NEXT_PUBLIC_API_URL + receiver.photo}
					objectFit="cover"
					alt="avatar"
				/>
				<span className={'mwt-chat-user-item__status ' + (isActiveUser ? 'active' : '')} />
			</div>
			<div className="mwt-chat-user-item__content">
				<div className="mwt-chat-user-item__title">
					<h6>{receiver.firstName + ' ' + receiver.lastName}</h6>
				</div>
				<div className="mwt-chat-user-item__text">
					<span>{isActiveUser ? 'Active now' : 'Not active now'}</span>
				</div>
			</div>
		</div>
	);
};

export default MainChatHeaderUserItem;
