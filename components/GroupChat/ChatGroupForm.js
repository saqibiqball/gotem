import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import dynamic from 'next/dynamic';
import { SocketContext } from '@/context/socket';
import { useSelector } from 'react-redux';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import { addMessageToGroupChat } from '@/http/chatAPI';
import { ChatGroupContext } from '@/context/chat-group';

const EmojiPicker = dynamic(() => import('@/components/UI/EmojiPicker'), { ssr: false });

const { StringType } = Schema.Types;
const model = Schema.Model({
	content: StringType()
		.isRequired('Message will not be empty')
		.maxLength(200, 'Cannot be greater than 200 characters'),
});

const ChatGroupForm = () => {
	const form = useRef();
	const socket = useContext(SocketContext);
	const { setMessages } = useContext(ChatGroupContext);
	const { currentUser } = useSelector((state) => state.user);
	const [formError, setFormError] = useState({});
	const [showEmoji, setShowEmoji] = useState(false);
	const [formData, setFormData] = useState({
		content: '',
	});

	const emojiHandler = (val) => {
		setFormData((prevState) => ({ content: prevState.content + val.native }));
	};

	const sendMessageHandler = async () => {
		if (!form.current.check()) return true;
		try {
			const msg = await addMessageToGroupChat(formData);
			setMessages((prev) => [...prev, msg]);
			setFormData({ content: '' });
			socket.emit('sendMessageToGroupChat', msg);
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setShowEmoji(false);
	};

	return (
		<div className="mwt-chat-group-form">
			{showEmoji && <EmojiPicker onEmojiSelect={(val) => emojiHandler(val)} />}
			<Form
				ref={form}
				onChange={setFormData}
				onCheck={setFormError}
				formError={formError}
				model={model}
				formValue={formData}
				checkTrigger="change"
			>
				<MWT_Row className="c-mb-10	">
					<MWT_Col>
						<CustomField
							placeholder="Type here"
							accepter="textarea"
							name="content"
							rows={1}
							inputButtonHandler={() => setShowEmoji(!showEmoji)}
							inputButtonLeft={'ico-Emoji-happy'}
							error={formError.content}
							onKeyPress={async (event) => {
								if (event.key === 'Enter') {
									await sendMessageHandler();
								}
							}}
						/>
						<Button className="btn-icon" onClick={sendMessageHandler}>
							<i className="ico-Pencil fs-20" />
						</Button>
					</MWT_Col>
				</MWT_Row>
			</Form>
		</div>
	);
};

export default ChatGroupForm;
