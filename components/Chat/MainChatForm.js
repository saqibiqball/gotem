import React, { useContext, useMemo, useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import { ChatContext } from '@/context/chat';
import CustomNotice from '@/components/UI/CustomNotice';
import { addNewPrivateChat, changeMessagesToRead } from '@/http/chatAPI';
import { useSelector } from 'react-redux';
import { SocketContext } from '@/context/socket';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('@/components/UI/EmojiPicker'), { ssr: false });

const { StringType } = Schema.Types;
const model = Schema.Model({
	content: StringType().isRequired('Message will not be empty'),
});

const MainChatForm = () => {
	const form = useRef();
	const socket = useContext(SocketContext);
	const { currentUser } = useSelector((state) => state.user);
	const { activeChat, setMessages } = useContext(ChatContext);
	const [formError, setFormError] = useState({});
	const [showEmoji, setShowEmoji] = useState(false);
	const [formData, setFormData] = useState({
		content: '',
	});

	const receiver = useMemo(() => {
		if (Object.keys(activeChat).length) {
			return activeChat.receiverId === currentUser.id
				? activeChat.sender
				: activeChat.receiver;
		}
		return {};
	}, [activeChat, currentUser]);

	const changeMessagesOnRead = async () => {
		try {
			if (Object.keys(activeChat).length > 0) {
				await changeMessagesToRead({ chatId: activeChat.id });
				socket.emit('readMessagesForCurrentChat', {
					receiverId: receiver.id,
					senderId: currentUser.id,
				});
			}
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	const emojiHandler = (val) => {
		setFormData((prevState) => ({ content: prevState.content + val.native }));
	};

	const sendMessageHandler = async () => {
		if (!form.current.check()) return true;
		try {
			const data = await addNewPrivateChat({ ...formData, receiverId: receiver.id });
			setMessages((prev) => [...prev, data.newMessage]);
			socket.emit('sendMessage', {
				receiverId: receiver.id,
				senderId: currentUser.id,
				message: data.newMessage,
				chatPrivateId: data.newMessage.chatPrivateId,
			});
			setFormData({ content: '' });
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setShowEmoji(false);
	};

	return (
		<div className="mwt-chat-main-form">
			{showEmoji && <EmojiPicker onEmojiSelect={(val) => emojiHandler(val)} />}
			<Form
				ref={form}
				onChange={setFormData}
				onCheck={setFormError}
				formError={formError}
				model={model}
				formValue={formData}
				checkTrigger="change"
				className="d-flex align-start"
			>
				<CustomField
					placeholder="Type here"
					accepter="textarea"
					name="content"
					rows={1}
					inputButtonHandler={() => setShowEmoji(!showEmoji)}
					inputButtonLeft={'ico-Emoji-happy'}
					error={formError.content}
					onClick={changeMessagesOnRead}
					onKeyPress={async (event) => {
						if (event.key === 'Enter') {
							await sendMessageHandler();
						}
					}}
				/>
				<Button className="rs-btn-main" onClick={sendMessageHandler}>
					send
				</Button>
			</Form>
		</div>
	);
};

export default MainChatForm;
