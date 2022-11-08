import React, { useState } from 'react';
import MilestonesInProposalItem from '@/components/Pages/Milestones/MilestonesInProposalItem';
import NoticeModal from '@/components/Modals/NoticeModal';

const MilestonesInProposalList = ({ milestones, onDelete, onEdit }) => {
	const [showModalNotice, setShowModalNotice] = useState(false);
	const [idDelete, setIdDelete] = useState(null);

	const openModalNotice = (id) => {
		setIdDelete(id);
		setShowModalNotice(true);
	};

	const closeModalNotice = () => setShowModalNotice(false);

	return (
		<>
			<NoticeModal
				showModal={showModalNotice}
				closeModal={closeModalNotice}
				handler={() => {
					onDelete(idDelete);
					closeModalNotice();
				}}
			/>
			<div>
				{milestones.map((milestone) => (
					<MilestonesInProposalItem
						key={milestone.id}
						milestone={milestone}
						onDelete={openModalNotice}
						onEdit={onEdit}
					/>
				))}
			</div>
		</>
	);
};

export default MilestonesInProposalList;
