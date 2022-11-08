import React, { useState } from 'react';
import { Button } from 'rsuite';
import EvidencesModal from '@/components/Modals/EvidencesModal';
import EvidencesFilesModal from '@/components/Modals/EvidencesFilesModal';

const AcceptOfferMilestonesButtonsSourcer = ({ milestone }) => {
	const [modalShow, setModalShow] = useState(false);
	const [modalShowFiles, setModalShowFiles] = useState(false);

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const handlerModalShowFiles = () => {
		setModalShowFiles(true);
	};

	const handlerModalCloseFiles = () => {
		setModalShowFiles(false);
	};

	return (
		<>
			<EvidencesModal
				modalShow={modalShow}
				handlerModalClose={handlerModalClose}
				milestone={milestone}
			/>
			<EvidencesFilesModal
				milestone={milestone}
				showModal={modalShowFiles}
				closeModal={handlerModalCloseFiles}
			/>
			<div className="milesestone-item-buttons">
				{milestone.statusId === 3 && (
					<Button
						appearance="ghost"
						className="rs-btn-main rs-btn-small"
						onClick={handlerModalShowFiles}
					>
						Show my evidence
					</Button>
				)}
				{milestone.statusId === 2 && (
					<Button
						appearance="ghost"
						className="rs-btn-main rs-btn-small"
						onClick={handlerModalShow}
					>
						Submit work for payment
					</Button>
				)}
			</div>
		</>
	);
};

export default AcceptOfferMilestonesButtonsSourcer;
