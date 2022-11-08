import React, { useEffect, useState } from 'react';
import { Button, Uploader } from 'rsuite';
import Image from 'next/image';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import NoticeModal from '@/components/Modals/NoticeModal';

const CustomUploaderImage = ({
	name,
	fileList,
	disabled,
	multiple,
	setFormValue,
	draggable,
	children,
	confirmNodal = false,
}) => {
	const [srcs, setSrcs] = useState([]);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [mainImage, setMainImage] = useState('');
	const [deletedImages, setDeletedImages] = useState([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setSrcs([]);
		setUploadedImages([]);
		if (fileList.length > 0) {
			if (multiple) {
				fileList.forEach((src) => {
					setSrcs((prevState) => [
						...prevState,
						{ id: src.id, src: process.env.NEXT_PUBLIC_API_URL + src.name },
					]);
				});
			} else {
				setMainImage(fileList.split('/').pop());
				setSrcs([process.env.NEXT_PUBLIC_API_URL + fileList]);
			}
		}
	}, [fileList]);

	const chooseImage = (value) => {
		if (multiple) {
			setUploadedImages((prevState) => [
				...prevState,
				{
					key: value[value.length - 1].fileKey,
					file: value[value.length - 1].blobFile,
				},
			]);

			setFormValue((prevState) => ({
				...prevState,
				['uploaded_' + name]: [
					...uploadedImages,
					{
						key: value[value.length - 1].fileKey,
						file: value[value.length - 1].blobFile,
					},
				],
			}));
		} else {
			setFormValue((prevState) => ({
				...prevState,
				['uploaded_' + name]: [
					{
						key: value[value.length - 1].fileKey,
						file: value[value.length - 1].blobFile,
					},
				],
				['deleted_' + name]: [mainImage],
			}));
			const blob = new Blob([value[value.length - 1].blobFile]);
			setSrcs([URL.createObjectURL(blob)]);
		}
	};

	const deleteImageHandler = () => {
		setSrcs([process.env.NEXT_PUBLIC_API_URL + 'placeholder-bg.png']);
		setFormValue((prevState) => ({
			...prevState,
			['uploaded_' + name]: [],
			toDelete: {
				...prevState.toDelete,
				[name]: mainImage,
			},
		}));
		closeModal();
	};

	const deleteImageHandlerForMultiple = (id) => {
		return () => {
			setDeletedImages((prevState) => [...prevState, id]);
			const arrToDelete = [...deletedImages, id];
			setSrcs([...srcs.filter((item) => item.id !== id)]);
			setFormValue((prevState) => ({
				...prevState,
				toDelete: {
					...prevState.toDelete,
					[name]: [...arrToDelete],
				},
			}));
		};
	};

	const deleteUploadedImagesHandler = (key) => {
		return () => {
			setFormValue((prevState) => ({
				...prevState,
				['uploaded_' + name]: prevState['uploaded_' + name].filter(
					(item) => item.key !== key
				),
			}));
			setUploadedImages((prevState) => [...prevState.filter((item) => item.key !== key)]);
		};
	};

	const openModal = () => {
		setShowModal(true);
	};
	const closeModal = () => setShowModal(false);

	return (
		<>
			{confirmNodal && (
				<NoticeModal
					showModal={showModal}
					closeModal={closeModal}
					handler={deleteImageHandler}
				/>
			)}
			<div className={multiple ? 'multiple-uploader' : 'single-uploader'}>
				{srcs.length > 0 && (
					<>
						{multiple ? (
							<>
								<MWT_Row>
									{srcs.map((src, i) => (
										<MWT_Col key={i} lg={2}>
											<div className="uploader-image img-fit">
												<Image
													width={150}
													height={150}
													src={src.src}
													alt="icon"
												/>
												<Button
													className="btn-icon btn-delete"
													onClick={deleteImageHandlerForMultiple(src.id)}
												>
													<i className="ico-Trash" />
												</Button>
											</div>
										</MWT_Col>
									))}
								</MWT_Row>
							</>
						) : (
							<>
								{srcs.map((src, i) => (
									<div key={i} className="uploader-image">
										<Image width={88} height={88} src={src} alt="icon" />
										<Button onClick={() => openModal()}>delete</Button>
									</div>
								))}
							</>
						)}
					</>
				)}
				{uploadedImages.length > 0 && (
					<MWT_Row>
						{uploadedImages.map((img, i) => (
							<MWT_Col key={i} lg={2}>
								<div className="uploader-image">
									<Image
										width={150}
										height={150}
										src={URL.createObjectURL(img.file)}
										alt="icon"
									/>
									<Button
										className="btn-icon btn-delete"
										onClick={deleteUploadedImagesHandler(img.key)}
									>
										<i className="ico-Trash" />
									</Button>
								</div>
							</MWT_Col>
						))}
					</MWT_Row>
				)}
				<Uploader
					action={'/'}
					fileListVisible={false}
					autoUpload={false}
					disabled={disabled}
					draggable={draggable}
					accept="image/png, image/jpeg, image/jpg, image/svg"
					onChange={(val) => chooseImage(val)}
				>
					{children}
				</Uploader>
			</div>
		</>
	);
};

export default CustomUploaderImage;
