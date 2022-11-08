import React, { useRef, useState } from 'react';
import { Button, Form, Modal, Schema } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomField from '@/components/UI/CustomField';
import CustomRate from '@/components/UI/CustomRate';
import { addReview } from '@/http/userAPI';

const { StringType, NumberType } = Schema.Types;

const reportModel = Schema.Model({
	content: StringType().isRequired('The field is required.'),
	ratingLevel: NumberType().isRequired('The field is required.'),
});

const ReviewModal = ({
	modalShow,
	handlerModalClose,
	proposalId,
	missionId,
	receiverId,
	setProposal,
}) => {
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [fetch, setFetch] = useState(false);
	const [formValue, setFormValue] = useState({
		ratingLevel: null,
		content: '',
		proposalId,
		missionId,
		receiverId,
	});

	const sendReviewHandler = async () => {
		if (!form.current.check()) return true;
		setFetch(true);
		try {
			const newReview = await addReview(formValue);
			setProposal((prev) => ({ ...prev, mission: { ...prev.mission, review: [newReview] } }));
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetch(false);
		handlerModalClose();
		setFormValue({ proposalId, missionId, receiverId });
	};
	return (
		<Modal
			className="vendor-modal"
			overflow={false}
			open={modalShow}
			onClose={handlerModalClose}
		>
			<Modal.Header>
				<Modal.Title>Send review</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MWT_Row className="c-mb-10 p-20 master-services" gutter={10}>
					<MWT_Col>
						<Form
							ref={form}
							onCheck={setFormError}
							model={reportModel}
							checkTrigger="change"
							formValue={formValue}
							onChange={setFormValue}
						>
							<CustomField
								name="ratingLevel"
								accepter={CustomRate}
								label="Rating Level"
								color={'color-main'}
								size={'sm'}
								allowHalf
								error={formError.ratingLevel}
							/>
							<CustomField
								name="content"
								accepter="textarea"
								label="Review text"
								rows={6}
								placeholder="your review text"
								error={formError.content}
							/>
						</Form>
					</MWT_Col>
				</MWT_Row>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div className="divider-30" />
				<p>
					<Button className="rs-btn-main" onClick={sendReviewHandler}>
						Send Review
					</Button>
					<Button onClick={handlerModalClose} className="rs-btn-main" appearance="ghost">
						Close
					</Button>
				</p>
			</Modal.Footer>
		</Modal>
	);
};

export default ReviewModal;
