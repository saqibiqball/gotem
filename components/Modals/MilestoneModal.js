import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'rsuite';
import MilestonesForm from '@/components/Pages/Milestones/MilestonesForm';

const MilestoneModal = ({ showModal, closeModal, fetching, onSubmit, toEdit }) => {
	const form = useRef();
	const defaultFormValue = {
		title: '',
		description: '',
		amount: null,
	};

	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState(defaultFormValue);

	useEffect(() => {
		if (Object.keys(toEdit).length > 0) {
			setFormValue(toEdit);
		}
	}, [toEdit]);

	const addMilestone = () => {
		if (!form.current.check()) return true;
		onSubmit(formValue);
		setFormValue(defaultFormValue);
	};

	return (
		<Modal
			size="md"
			open={showModal}
			onClose={() => {
				closeModal();
				setFormValue(defaultFormValue);
			}}
		>
			<Modal.Header>
				<Modal.Title>Add/Edit Milestone</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MilestonesForm
					form={form}
					fetching={fetching}
					formValue={formValue}
					setFormValue={setFormValue}
					setFormError={setFormError}
					formError={formError}
				/>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div>
					<Button className="rs-btn-main rs-btn-small" onClick={addMilestone}>
						Save
					</Button>
					<Button className="rs-btn-danger rs-btn-small" onClick={closeModal}>
						Cancel
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default MilestoneModal;
