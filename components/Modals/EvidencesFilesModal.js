import React from 'react';
import { Button, Modal } from 'rsuite';
import More from '@/components/UI/More';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import ImagePreview from '@/components/UI/ImagePreview';

const EvidencesFilesModal = ({ milestone, showModal, closeModal }) => {
	return (
		<Modal size="md" open={showModal} onClose={closeModal}>
			<Modal.Header>
				<Modal.Title>Milestone Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h6 className="mb-20 fs-20">About Milestone:</h6>
				<h6 className="fs-18 mt-0 mb-10">{milestone.title}</h6>
				<More
					elem={milestone}
					text={milestone.description}
					color={'fontColor'}
					number={200}
				/>
				{milestone.evidences && Object.keys(milestone.evidences).length > 0 && (
					<>
						<hr />
						<h6 className="mt-20 fs-20 mb-20">About Evidence:</h6>
						<h6 className="fs-18 mb-10 mt-0">{milestone.evidences?.title}</h6>
						<More
							elem={milestone.evidences}
							text={milestone.evidences?.description}
							color={'fontColor'}
							number={200}
						/>
					</>
				)}
				{milestone.evidences?.evidenceFiles.length > 0 && (
					<>
						<h6 className="mb-20 mt-20 fs-20">Files:</h6>
						<MWT_Row>
							{milestone.evidences?.evidenceFiles.map((file) => (
								<MWT_Col key={file.id} lg={2}>
									<ImagePreview file={file} />
								</MWT_Col>
							))}
						</MWT_Row>
					</>
				)}
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div>
					<Button className="rs-btn-danger rs-btn-small" onClick={closeModal}>
						close
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default EvidencesFilesModal;
