import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Modal, Schema } from 'rsuite';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomField from '@/components/UI/CustomField';
import scrollToBottom from '@/helpers/scrollToBottom';
import { addNewPrivateChat } from '@/http/chatAPI';
import { SocketContext } from '@/context/socket';
import { useSelector } from 'react-redux';

const { StringType } = Schema.Types;

const model = Schema.Model({
	content: StringType().isRequired('The field is required.'),
});

const SendMessageModal = ({ modalShow, handlerModalClose, user }) => {
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
		handlerModalClose();
	};

	return (
		<Modal
			className="vendor-modal"
			overflow={false}
			open={modalShow}
			onClose={handlerModalClose}
		>
			<Modal.Header>
				<Modal.Title>Send report a claim to admin</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
					</Form>
				)}
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div className="divider-30" />
				<p>
					<Button className="rs-btn-main" disabled={fetching} onClick={handleSubmit}>
						send message
					</Button>
					<Button onClick={handlerModalClose} className="rs-btn-main" appearance="ghost">
						Close
					</Button>
				</p>
			</Modal.Footer>
		</Modal>
	);
};

export default SendMessageModal;
