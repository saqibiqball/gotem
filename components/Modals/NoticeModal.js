import React from 'react';
import { Button, Modal } from 'rsuite';

const NoticeModal = ({ showModal, closeModal, text, handler }) => {
	return (
		<Modal size="sm" open={showModal} onClose={closeModal}>
			<Modal.Header />
			<Modal.Body className="text-center">
				<p className="fs-24 fw-500 color-darkColor mb-20">
					{text ? text : 'Are you sure ?'}
				</p>
				<div>
					<Button className="rs-btn-danger rs-btn-small m-5" onClick={closeModal}>
						Cancel
					</Button>
					<Button className="rs-btn-main rs-btn-small m-5" onClick={handler}>
						Yes
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default NoticeModal;
