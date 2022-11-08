import React from 'react';
import Image from 'next/image';
import CustomRate from '@/components/UI/CustomRate';

const MissionPageAuthor = ({ user }) => {
	return (
		<div className="author">
			<div className="image d-in-flex d-shrink img-fit">
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + user.photo}
					width={88}
					height={88}
					alt="author-photo"
					objectFit={'cover'}
				/>
			</div>
			<div className="author-content">
				<h6 className="fw-400">
					{user.firstName} {user.lastName}
				</h6>
				<div className="mb-10">
					<CustomRate
						color={'color-main2'}
						readOnly
						size={'xs'}
						allowHalf
						rating={user.rating}
					/>
				</div>
				<span className="status active">Verified</span>
			</div>
		</div>
	);
};

export default MissionPageAuthor;
