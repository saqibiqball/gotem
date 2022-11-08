import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const RenderButton = (props, ref) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div className="navbar-avatar" {...props} ref={ref}>
			<div className="image">
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + currentUser.photo}
					alt="avatar"
					width="32"
					height="32"
				/>
			</div>
		</div>
	);
};

export default RenderButton;
