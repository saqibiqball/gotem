import React, { useEffect, useRef, useState } from 'react';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import Image from 'next/image';
import { Button, Form, Schema, Uploader } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import CustomNotice from '@/components/UI/CustomNotice';
import { isSourcerFetch, verification } from '@/http/userAPI';
import { useRouter } from 'next/router';
import scrollToTop from '@/helpers/scrollToTop';

const { ArrayType } = Schema.Types;

const model = Schema.Model({
	files: ArrayType().minLength(1, 'Min length 1 file').isRequired('Files is required'),
	files2: ArrayType().minLength(1, 'Min length 1 file').isRequired('Files is required'),
});

const Verification = () => {
	const form = useRef();
	const router = useRouter();
	const link = router.query.link;
	const [formError, setFormError] = useState({});
	const [fetching, setFetching] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [isSourcer, setIsSourcer] = useState(false);
	const [formValue, setFormValue] = useState({
		files: [],
		files2: [],
		files3: [],
		licenseID: '',
	});

	useEffect(() => {
		const fetchIfIsSourcer = async () => {
			setFetching(true);
			try {
				if (link) {
					const isSourcerData = await isSourcerFetch(link);
					setIsSourcer(isSourcerData);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetching(false);
		};
		fetchIfIsSourcer();
	}, [link]);

	const deleteImageHandler = (fileKey) => {
		return () => {
			setFormValue((prevState) => ({
				...prevState,
				files: formValue.files.filter((img) => img.fileKey !== fileKey),
				files2: formValue.files2.filter((img) => img.fileKey !== fileKey),
			}));
		};
	};

	const uploadHandler = () => {
		return async () => {
			if (!form.current.check()) {
				scrollToTop();
				return true;
			}
			setFetching(true);
			try {
				const data = new FormData();
				data.append('link', router.query.link);
				data.append('licenseID', formValue.licenseID);
				formValue.files.forEach((item) => {
					data.append('files', item.blobFile);
				});
				formValue.files2.forEach((item) => {
					data.append('files2', item.blobFile);
				});
				formValue.files3.forEach((item) => {
					data.append('files3', item.blobFile);
				});
				const res = await verification(data);
				setSuccessMsg(res);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetching(false);
		};
	};

	return (
		<section className="ls ms s-py-90 s-py-xl-120 h-100">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xxl={6} xl={6} lg={8} xs={12} className="text-center ml-auto mr-auto">
						<div className="login-logo">
							<Image
								alt="logo"
								src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo.svg'}
								width={1120}
								height={456}
								quality={100}
							/>
						</div>
						<div className="divider-30" />
						{successMsg.length > 0 ? (
							<h6 className="special-heading">
								<span>Verification now in process</span>
							</h6>
						) : (
							<>
								<h6 className="special-heading mb-15">
									<span>Please verify your identity</span>
								</h6>
								<p>
									In order to prevent illegal activity, we ask that all our users
									perform a basic identity check.
								</p>
							</>
						)}
						<div className="divider-40" />
						<div className="p-30 p-xxl-65 ls shadow rounded">
							{successMsg.length > 0 ? (
								<p className="text-center">{successMsg}</p>
							) : (
								<>
									<Form
										className="text-left"
										ref={form}
										model={model}
										onCheck={setFormError}
										formError={formError}
										checkTrigger="change"
										formValue={formValue}
										onChange={setFormValue}
									>
										<MWT_Row>
											<MWT_Col>
												{isSourcer && (
													<MWT_Row className="c-mb-10">
														<MWT_Col>
															<CustomField
																label="Enter your license ID"
																placeholder="licenseID"
																disabled={fetching}
																type="text"
																name="licenseID"
																error={formError.nickName}
															/>
														</MWT_Col>
														<MWT_Col>
															<CustomField
																action={'/'}
																name="files3"
																label="Licence photo"
																listType="picture"
																accepter={Uploader}
																accept="image/png, image/jpeg, image/jpg, image/svg"
																multiple={true}
																fileList={formValue.files3}
																fileListVisible={false}
																autoUpload={false}
																className="verification-uploader"
																disabled={fetching}
																draggable
															>
																<div>Licence photo</div>
															</CustomField>
															<MWT_Row>
																{formValue.files3.map((image) => {
																	return (
																		<MWT_Col
																			key={image.fileKey}
																			lg={4}
																			xl={3}
																		>
																			<div className="verification-images">
																				<Image
																					width={200}
																					height={200}
																					image={image}
																					src={URL.createObjectURL(
																						image.blobFile
																					)}
																					handler={
																						deleteImageHandler
																					}
																					item={
																						image.fileKey
																					}
																					// loading={fetching}
																					className="img-fit"
																					alt="image"
																				/>
																				<Button
																					className="rs-btn-main"
																					onClick={deleteImageHandler(
																						image.fileKey
																					)}
																				>
																					<i className="fs-16 ico ico-X" />
																				</Button>
																			</div>
																		</MWT_Col>
																	);
																})}
															</MWT_Row>
														</MWT_Col>
													</MWT_Row>
												)}
											</MWT_Col>
											<MWT_Col>
												<CustomField
													action={'/'}
													name="files"
													label="Choose one of the following documents to provide: Passport, Drivers License, or State issued Identification Card"
													listType="picture"
													accepter={Uploader}
													accept="image/png, image/jpeg, image/jpg, image/svg"
													multiple={true}
													fileList={formValue.files}
													fileListVisible={false}
													autoUpload={false}
													className="verification-uploader"
													disabled={fetching}
													draggable
												>
													<div>
														Click or drag files to this area to upload
													</div>
												</CustomField>
												<MWT_Row>
													{formValue.files.map((image) => {
														return (
															<MWT_Col
																key={image.fileKey}
																lg={4}
																xl={3}
															>
																<div className="verification-images">
																	<Image
																		width={200}
																		height={200}
																		image={image}
																		src={URL.createObjectURL(
																			image.blobFile
																		)}
																		handler={deleteImageHandler}
																		item={image.fileKey}
																		// loading={fetching}
																		className="img-fit"
																		alt="image"
																	/>
																	<Button
																		className="rs-btn-main"
																		onClick={deleteImageHandler(
																			image.fileKey
																		)}
																	>
																		<i className="fs-16 ico ico-X" />
																	</Button>
																</div>
															</MWT_Col>
														);
													})}
												</MWT_Row>
											</MWT_Col>
											<MWT_Col>
												<CustomField
													action={'/'}
													name="files2"
													label={
														<>
															Please submit a selfie of yourself
															holding your identification next to your
															face.{' '}
															<a href="#">
																See example by clicking here
															</a>
														</>
													}
													listType="picture"
													accepter={Uploader}
													accept="image/png, image/jpeg, image/jpg, image/svg"
													multiple={true}
													fileList={formValue.files2}
													fileListVisible={false}
													autoUpload={false}
													className="verification-uploader"
													disabled={fetching}
													draggable
												>
													<div>
														Click or drag files to this area to upload
													</div>
												</CustomField>
												<MWT_Row>
													{formValue.files2.map((image) => {
														return (
															<MWT_Col
																key={image.fileKey}
																lg={4}
																xl={3}
															>
																<div className="verification-images">
																	<Image
																		width={200}
																		height={200}
																		image={image}
																		src={URL.createObjectURL(
																			image.blobFile
																		)}
																		handler={deleteImageHandler}
																		item={image.fileKey}
																		// loading={fetching}
																		className="img-fit"
																		alt="image"
																	/>
																	<Button
																		className="rs-btn-main"
																		onClick={deleteImageHandler(
																			image.fileKey
																		)}
																	>
																		<i className="fs-16 ico ico-X" />
																	</Button>
																</div>
															</MWT_Col>
														);
													})}
												</MWT_Row>
											</MWT_Col>
										</MWT_Row>
									</Form>

									<MWT_Row>
										<Button
											block
											disabled={fetching}
											className="rs-btn-main"
											onClick={uploadHandler()}
										>
											Submit
										</Button>
									</MWT_Row>
								</>
							)}
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

export default Verification;
