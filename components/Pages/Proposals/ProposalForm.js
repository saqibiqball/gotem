import React, { useState } from 'react';
import { Button, Form, InputNumber, Radio, RadioGroup } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import { useRouter } from 'next/router';
import CustomField from '@/components/UI/CustomField';
import MilestoneModal from '@/components/Modals/MilestoneModal';
import MilestonesInProposalList from '@/components/Pages/Milestones/MilestonesInProposalList';

const ProposalForm = ({
	form,
	setFormError,
	formError,
	formValue,
	setFormValue,
	model,
	fetch,
	handleSubmit,
	setMilestones,
	milestones,
}) => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [toEdit, setToEdit] = useState({});

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const addMilestone = (newMilestone) => {
		if (Object.keys(toEdit).length) {
			const idx = milestones.findIndex((item) => item.id === newMilestone.id);
			const before = milestones.slice(0, idx);
			const after = milestones.slice(idx + 1);
			setMilestones([...before, newMilestone, ...after]);
		} else {
			setMilestones([...milestones, { ...newMilestone, id: Date.now() }]);
		}
		closeModal();
		setToEdit({});
	};

	const deleteMilestone = (id) => {
		const newArr = milestones.filter((milestone) => milestone.id !== id);
		setMilestones([...newArr]);
		closeModal();
	};

	const editMilestone = (milestone) => {
		openModal();
		setToEdit(milestone);
	};

	return (
		<>
			<MilestoneModal
				showModal={showModal}
				fetching={fetch}
				closeModal={closeModal}
				onSubmit={addMilestone}
				toEdit={toEdit}
			/>
			<Form
				ref={form}
				onCheck={setFormError}
				formError={formError}
				model={model}
				checkTrigger="change"
				formValue={formValue}
				onChange={setFormValue}
			>
				<MWT_Row className="c-mb-16" gutter={16}>
					<MWT_Col>
						<CustomField
							placeholder="Message"
							name="description"
							disabled={fetch}
							accepter="textarea"
							rows={5}
							error={formError.description}
						/>
					</MWT_Col>
					<MWT_Col>
						<CustomField
							name="isFixedPrice"
							accepter={RadioGroup}
							disabled={fetch}
							error={formError.isFixedPrice}
							checked={formValue.isFixedPrice}
							onChange={(value) => {
								setFormValue({
									...formValue,
									isFixedPrice: value,
									amount: null,
									retainerAmount: null,
								});
								setMilestones([]);
							}}
						>
							<Radio value={1}>Fixed Price</Radio>
							<Radio value={0}>Milestones</Radio>
						</CustomField>
					</MWT_Col>
					{formValue.isFixedPrice === 1 && (
						<>
							<MWT_Col>
								<CustomField
									placeholder="Amount"
									disabled={fetch}
									min={0}
									accepter={InputNumber}
									name="amount"
									error={formError.amount}
								/>
							</MWT_Col>
							<MWT_Col>
								<CustomField
									placeholder="Retainer Amount"
									disabled={fetch}
									min={0}
									accepter={InputNumber}
									name="retainerAmount"
									error={formError.retainerAmount}
								/>
							</MWT_Col>
						</>
					)}
					{formValue.isFixedPrice === 0 && (
						<>
							<MWT_Col>
								<Button className="rs-btn-main mr-20" onClick={() => openModal()}>
									+ Add Milestone
								</Button>
							</MWT_Col>
							<MWT_Col>
								<MilestonesInProposalList
									milestones={milestones}
									onDelete={deleteMilestone}
									onEdit={editMilestone}
								/>
							</MWT_Col>
						</>
					)}
					<MWT_Col>
						<Form.Group>
							<Button className="rs-btn-main mr-20" onClick={handleSubmit}>
								submit your proposal
							</Button>
							<Button className="rs-btn-main2" onClick={() => router.back()}>
								cancel
							</Button>
						</Form.Group>
					</MWT_Col>
				</MWT_Row>
			</Form>
		</>
	);
};

export default ProposalForm;
