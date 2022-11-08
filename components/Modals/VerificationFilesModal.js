import React from 'react';
import { Button, Form, Modal } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import Image from 'next/image';
import CustomField from '@/components/UI/CustomField';

const OptionsLightbox = () => {
	return {
		thumbnails: {
			thumbnailsPosition: 'right',
			thumbnailsSize: ['185px', '154px'],
			thumbnailsGap: '5px 0',
		},
		buttons: {
			showDownloadButton: false,
			size: '35px',
		},
		caption: {
			showCaption: false,
		},
		settings: {
			autoplaySpeed: 5000,
		},
	};
};

const VerificationFilesModal = ({
	showModal,
	closeModal,
	handlerApproveReject,
	userInfo,
	userFiles: { files, selfyFiles },
	form,
	setFormError,
	formError,
	formValue,
	setFormValue,
	model,
}) => {
	return (
		<Modal size="md" open={showModal} onClose={closeModal}>
			<Modal.Header>
				<Modal.Title>
					User {userInfo.firstName} {userInfo.lastName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{userInfo.license.length > 0 && (
					<MWT_Col>
						<h6>User license ID: {userInfo.license}</h6>
						<div className="divider-30" />
					</MWT_Col>
				)}
				{files && files.length > 0 && (
					<MWT_Col>
						<p className="bold">
							Following documents to provide: Passport, Drivers License, or State
							issued Identification Card
						</p>
						<SimpleReactLightbox>
							<SRLWrapper options={OptionsLightbox()}>
								<MWT_Row>
									{files.map((image) => {
										return (
											<MWT_Col key={image.id} lg={4} xl={3}>
												<a
													className="d-grid rounded overflow-hidden img-fit"
													href={
														process.env.NEXT_PUBLIC_API_URL + image.name
													}
												>
													<div className="verification-images">
														<Image
															width={900}
															height={700}
															image={image}
															src={
																process.env.NEXT_PUBLIC_API_URL +
																image.name
															}
															className="img-fit"
															alt="image"
														/>
														{/*<Button className='rs-btn-main'*/}
														{/*		onClick={deleteImageHandler(image.id)}><i*/}
														{/*	className='fs-16 ico ico-X' /></Button>*/}
													</div>
												</a>
											</MWT_Col>
										);
									})}
								</MWT_Row>
							</SRLWrapper>
						</SimpleReactLightbox>
					</MWT_Col>
				)}
				{selfyFiles && selfyFiles.length > 0 && (
					<MWT_Col>
						<p className="bold">Selfie files</p>
						<SimpleReactLightbox>
							<SRLWrapper options={OptionsLightbox()}>
								<MWT_Row>
									{selfyFiles.map((image) => {
										return (
											<MWT_Col key={image.id} lg={4} xl={3}>
												<a
													className="d-grid rounded overflow-hidden img-fit"
													href={
														process.env.NEXT_PUBLIC_API_URL + image.name
													}
												>
													<div className="verification-images">
														<Image
															width={900}
															height={700}
															image={image}
															src={
																process.env.NEXT_PUBLIC_API_URL +
																image.name
															}
															// loading={fetching}
															className="img-fit"
															alt="image"
														/>
														{/*<Button className='rs-btn-main'*/}
														{/*		onClick={deleteImageHandler(image.id)}><i*/}
														{/*	className='fs-16 ico ico-X' /></Button>*/}
													</div>
												</a>
											</MWT_Col>
										);
									})}
								</MWT_Row>
							</SRLWrapper>
						</SimpleReactLightbox>
					</MWT_Col>
				)}
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
						label="Reject text"
						placeholder="Reject text"
						accepter="textarea"
						rows={8}
						name="rejectMsg"
						error={formError.rejectMsg}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer className="text-center">
				<div>
					<Button
						className="rs-btn-main rs-btn-small"
						onClick={() => handlerApproveReject(userInfo.email, userInfo.id, 1)}
					>
						Approve
					</Button>
					<Button
						className="rs-btn-main rs-btn-small"
						onClick={() => handlerApproveReject(userInfo.email, userInfo.id, 2)}
					>
						Reject
					</Button>
					<Button className="rs-btn-danger rs-btn-small" onClick={closeModal}>
						Cancel
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default VerificationFilesModal;
