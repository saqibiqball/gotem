import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Modal, Schema } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomField from '@/components/UI/CustomField';
import { addDispute } from '@/http/disputesAPI';
import { ProposalContext } from '@/context/proposal';

const { StringType } = Schema.Types;

const reportModel = Schema.Model({
	reason: StringType().isRequired('The field is required.'),
});

const DisputeModal = ({ modalShow, handlerModalClose, proposalId, milestoneId }) => {
	const [proposal, setProposal] = useContext(ProposalContext);
	const form = useRef();
	const [formError, setFormError] = useState({});
	const [fetch, setFetch] = useState(false);
	const [formValue, setFormValue] = useState({
		reason: '',
		proposalId,
		milestoneId,
	});

	const disputeHandler = async () => {
		setFetch(true);
		try {
			await addDispute(formValue);
			const cloneProposal = { ...proposal };
			const needMilestone = cloneProposal.milestones.find((m) => m.id === milestoneId);
			needMilestone.statusId = 5;
			needMilestone.status = { id: 5, name: 'Dispute' };
			setProposal(cloneProposal);
			setFormValue({ reason: '', proposalId, milestoneId });

		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetch(false);
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
				<Modal.Title>Send dispute reason</Modal.Title>
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
								name="reason"
								accepter="textarea"
								label="Dispute reason"
								disabled={fetch}
								rows={6}
								placeholder="Your dispute reason"
								error={formError.reason}
							/>
						</Form>
					</MWT_Col>
				</MWT_Row>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div className="divider-30" />
				<p>
					<Button className="rs-btn-main" disabled={fetch} onClick={disputeHandler}>
						Send Dispute
					</Button>
					<Button onClick={handlerModalClose} className="rs-btn-main" appearance="ghost">
						Close
					</Button>
				</p>
			</Modal.Footer>
		</Modal>
	);
};

export default DisputeModal;
