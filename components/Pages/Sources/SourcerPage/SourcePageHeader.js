import React from 'react';
import Image from 'next/image';

const SourcePageHeader = ({ user }) => {
	return (
		<div className="ls sourcer-page-header sources-wrap bordered">
			<div className="sources-content-wrap align-md-center">
				<div className="sources-media img-fit">
					<Image
						src={process.env.NEXT_PUBLIC_API_URL + user.photo}
						width={88}
						height={88}
						alt="source-photo"
						objectFit={'cover'}
					/>
				</div>
				<div className="sources-content">
					<div className="">
						<h4 className="fs-28 mb-10">
							{user.firstName} {user.lastName}
						</h4>
						<span>
							{user.city}
							{user.administartiveArea.length > 0
								? ', ' + user.administartiveArea
								: ''}
						</span>

						<span className="status active">Verified</span>
					</div>
					{user.userLicense.length > 0 && <>License: {user.userLicense}</>}
				</div>
			</div>
		</div>
	);
};

export default SourcePageHeader;
