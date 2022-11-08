import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomRate from '@/components/UI/CustomRate';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const MissionItemAuthor = ({ user = {}, missionId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [usersLink, setUsersLink] = useState('');
	useEffect(() => {
		if (currentUser.roleId === 3) {
			setUsersLink(`/dashboard-source/${currentUser.slug}/mission-catalog`);
		} else {
			setUsersLink(`/dashboard-admin/${currentUser.slug}/missions`);
		}
	}, [currentUser]);

	return (
		<>
			{Object.keys(user).length > 0 && (
				<ul className="case-list align-center">
					<li>
						<div className="author">
							<div className="image d-in-flex d-shrink img-fit">
								<Image
									src={process.env.NEXT_PUBLIC_API_URL + user.photo}
									width={56}
									height={56}
									alt="author-photo"
									objectFit={'cover'}
								/>
							</div>
							<div className="author-content">
								<Link href={`${usersLink}/${missionId}/author/${user.slug}`}>
									<a>
										<h5 className="fs-14 fw-400">
											{user.firstName} {user.lastName}
										</h5>
									</a>
								</Link>
							</div>
						</div>
					</li>
					<li>
						<i className="ico-Location-marker" />{' '}
						<span className="fs-14">{user.location}</span>
					</li>
					{user.rating > 0 && (
						<li>
							<CustomRate
								color={'color-main'}
								readOnly
								rating={user.rating}
								size={'xs'}
								text={user.countReviews + ' reviews'}
								allowHalf
							/>
						</li>
					)}
				</ul>
			)}
		</>
	);
};

export default MissionItemAuthor;
