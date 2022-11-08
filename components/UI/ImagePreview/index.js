import React from 'react';
import Image from 'next/image';

const ImagePreview = ({ file }) => {
	let fileType = file.name.split('/').pop().split('.').pop();
	let fileName = file.name.split('/').pop();
	let src =
		fileType === 'pdf'
			? process.env.NEXT_PUBLIC_API_URL + 'pdf.png'
			: process.env.NEXT_PUBLIC_API_URL + file.name;
	return (
		<>
			<div>
				<Image width={150} height={150} src={src} alt={fileName} objectFit="contain" />
			</div>
			<a target="_blank" href={process.env.NEXT_PUBLIC_API_URL + file.name} rel="noreferrer">
				{fileName}
			</a>
		</>
	);
};

export default ImagePreview;
