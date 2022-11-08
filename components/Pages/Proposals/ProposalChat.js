import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Schema } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import scrollToBottom from '@/helpers/scrollToBottom';
import CustomNotice from '@/components/UI/CustomNotice';
import { addNewPrivateChat } from '@/http/chatAPI';
import { SocketContext } from '@/context/socket';
import { useSelector } from 'react-redux';

const { StringType } = Schema.Types;

const model = Schema.Model({
	content: StringType().isRequired('The field is required.'),
});

const ProposalChat = ({ user = {} }) => {
	const form = useRef();
	const socket = useContext(SocketContext);
	const { currentUser } = useSelector((state) => state.user);
	const [formError, setFormError] = useState({});
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		content: '',
	});

	const handleSubmit = async () => {
		if (!form.current.check()) {
			scrollToBottom();
			return true;
		}
		setFetching(true);

		try {
			const data = await addNewPrivateChat({
				content: formValue.content,
				receiverId: user.id,
			});
			socket.emit('sendMessage', {
				receiverId: user.id,
				senderId: currentUser.id,
				message: data.newMessage,
				chatPrivateId: data.newMessage.chatPrivateId,
			});

			setFormValue({ content: '' });
			CustomNotice({
				content: 'Your message was sent',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}

		setFetching(false);
	};

	return (
		<div>
			{Object.keys(user).length > 0 && (
				<Form
					ref={form}
					onCheck={setFormError}
					formError={formError}
					model={model}
					checkTrigger="change"
					formValue={formValue}
					onChange={setFormValue}
				>
					<CustomField
						label={`Chat with ${user?.firstName} ${user?.lastName}`}
						placeholder="Message"
						name="content"
						accepter="textarea"
						rows={5}
						disabled={fetching}
					/>
					<Button className="rs-btn-main" disabled={fetching} onClick={handleSubmit}>
						send message
					</Button>
				</Form>
			)}
		</div>
	);
};

export default ProposalChat;
