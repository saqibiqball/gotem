import React from 'react';
import Image from 'next/image';

const CustomLoader = ({ text }) => {
	return (
		<div className="custom-loader">
			<Image
				alt="loader"
				loading="eager"
				src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo-icon.svg'}
				width="64"
				height="64"
			/>
			{text && <p className="text-center color-main fw-500">{text}</p>}
		</div>
	);
};

export default CustomLoader;
