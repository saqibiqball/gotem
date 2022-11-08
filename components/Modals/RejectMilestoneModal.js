import React, { useRef, useState } from 'react';
import { Button, Form, Modal, Schema } from 'rsuite';
import CustomField from '@/components/UI/CustomField';

const { StringType } = Schema.Types;

const reportModel = Schema.Model({
	message: StringType().isRequired('The field is required.'),
});

const RejectMilestoneModal = ({ modalShow, handlerModalClose, handlerSend }) => {
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		message: '',
	});

	return (
		<Modal
			className="vendor-modal"
			overflow={false}
			open={modalShow}
			onClose={handlerModalClose}
		>
			<Modal.Header>
				<Modal.Title>Send reject message to source</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					ref={form}
					onCheck={setFormError}
					model={reportModel}
					checkTrigger="change"
					formValue={formValue}
					onChange={setFormValue}
				>
					<CustomField
						name="message"
						accepter="textarea"
						rows={5}
						placeholder="Reject text"
						error={formError.message}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div className="divider-30" />
				<p>
					<Button className="rs-btn-main" onClick={handlerSend}>
						Send Message
					</Button>
					<Button onClick={handlerModalClose} className="rs-btn-main" appearance="ghost">
						Close
					</Button>
				</p>
			</Modal.Footer>
		</Modal>
	);
};

export default RejectMilestoneModal;
