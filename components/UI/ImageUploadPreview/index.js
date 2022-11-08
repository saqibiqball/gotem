import React from 'react';
import Image from 'next/image';

const ImageUploadPreview = ({ file }) => {
	let src =
		file.blobFile.type === 'application/pdf'
			? process.env.NEXT_PUBLIC_API_URL + 'pdf.png'
			: URL.createObjectURL(file.blobFile);
	return (
		<>
			<div>
				<Image width={150} height={150} src={src} alt={file.name} objectFit="contain" />
			</div>
			<a target="_blank" href={URL.createObjectURL(file.blobFile)} rel="noreferrer">
				{file.name}
			</a>
		</>
	);
};

export default ImageUploadPreview;
