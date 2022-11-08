import React, { useContext, useMemo } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { ChatContext } from '@/context/chat';
import { Badge } from 'rsuite';

const SidebarChatUserItem = ({ chat, getMessages, activeUsers }) => {
	const { currentUser } = useSelector((state) => state.user);
	const { unreadMessages } = useContext(ChatContext);

	const countUnreadMessages = useMemo(() => {
		if (unreadMessages.length > 0) {
			const needChat = unreadMessages.find((el) => el.id === chat.id);

			if (needChat && Object.keys(needChat).length > 0) {
				return needChat.messages.length;
			}
		}
		return 0;
	}, [chat.id, unreadMessages]);

	const receiver = useMemo(() => {
		if (Object.keys(chat).length) {
			return chat.receiverId === currentUser.id ? chat.sender : chat.receiver;
		}
		return {};
	}, [chat, currentUser]);

	const isActiveUser = useMemo(() => {
		if (activeUsers.length > 0 && 'id' in receiver) {
			return activeUsers.some((el) => el === receiver.id);
		}
		return false;
	}, [activeUsers, receiver]);

	const cutMessageText = (text) => {
		return text.length > 25 ? text.slice(0, 25) + '...' : text;
	};

	return (
		<div className="mwt-chat-user-item" onClick={getMessages}>
			<div className="mwt-chat-user-item__media">
				<Image
					quality={100}
					width={56}
					height={56}
					src={process.env.NEXT_PUBLIC_API_URL + receiver.photo}
					objectFit="cover"
					alt="avatar"
				/>
				<span className={'mwt-chat-user-item__status ' + (isActiveUser ? 'active' : '')} />
			</div>
			<div className="mwt-chat-user-item__content">
				<div className="mwt-chat-user-item__title">
					<h6>
						{receiver.firstName + ' ' + receiver.lastName}{' '}
						<span>{formatDistanceToNow(new Date(chat.updatedAt))}</span>
					</h6>
				</div>
				<div className="mwt-chat-user-item__text d-flex align-end">
					<span className="mb-0">{cutMessageText(chat.lastMessage)} </span>
					{countUnreadMessages >= 1 && (
						<Badge className="ml-auto" content={countUnreadMessages.toString()} />
					)}
				</div>
			</div>
		</div>
	);
};

export default SidebarChatUserItem;
