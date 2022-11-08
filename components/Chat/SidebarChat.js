import React, { useContext, useEffect, useState } from 'react';
import SidebarChatFilter from '@/components/Chat/SidebarChatFilter';
import SidebarChatUsers from '@/components/Chat/SidebarChatUsers';
import { Button } from 'rsuite';
import { ChatContext } from '@/context/chat';
import { getAllPrivateChats } from '@/http/chatAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomLoader from '@/components/UI/CustomLoader';

const Sidebar = () => {
	const { isSidebarOpen, setIsSidebarOpen, chats, setChats } = useContext(ChatContext);
	const [searchChats, setSearchChats] = useState(chats);
	const [fetch, setFetch] = useState(false);

	useEffect(() => {
		const fetchChats = async () => {
			setFetch(true);
			try {
				const chatsData = await getAllPrivateChats();
				setChats(chatsData);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchChats();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			{!fetch ? (
				<div className={'mwt-chat-sidebar ' + (isSidebarOpen ? 'active' : '')}>
					<Button
						className=" mwt-chat-sidebar__toogle"
						onClick={() => setIsSidebarOpen(true)}
					>
						<i className="ico-Arrow-narrow-left1" />
					</Button>
					<SidebarChatFilter chats={chats} setSearchChats={setSearchChats} />
					<SidebarChatUsers chats={searchChats} />
				</div>
			) : (
				<CustomLoader />
			)}
		</>
	);
};

export default Sidebar;
