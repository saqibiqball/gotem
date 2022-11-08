import React, { useMemo } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';

const MainChatContentUserItem = ({ message, scroll }) => {
	const { currentUser } = useSelector((state) => state.user);
	const own = useMemo(() => {
		if (Object.keys(message).length) {
			return message.userId === currentUser.id;
		}
		return false;
	}, [message, currentUser]);

	return (
		<div ref={scroll} className={'mwt-chat-user-item ' + (own ? 'own' : '')}>
			<div className="mwt-chat-user-item__media">
				<Image
					quality={100}
					width={56}
					height={56}
					src={process.env.NEXT_PUBLIC_API_URL + message.user.photo}
					objectFit="cover"
					alt="avatar"
				/>
			</div>
			<div className="mwt-chat-user-item__content">
				<div className="mwt-chat-user-item__title">
					<h6>{message.user.firstName + ' ' + message.user.lastName}</h6>
					<span>{formatDistanceToNow(new Date(message.createdAt))}</span>
				</div>
				<div className="mwt-chat-user-item__text d-flex">
					<p className="mr-auto pr-5">{message.content}</p>
					{own && (
						<span>
							<i className="ico-Check1" />
							{message.isRead && <i className="ico-Check1" />}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default MainChatContentUserItem;
