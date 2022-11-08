import React, { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';
import CustomRate from '@/components/UI/CustomRate';

const BookmarkSourcer = ({ user, deleteHandler }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [usersLink, setUsersLink] = useState('');

	useEffect(() => {
		if (currentUser.roleId === 3) {
			setUsersLink(`/dashboard-source/${currentUser.slug}/source-catalog`);
		} else {
			setUsersLink(`/dashboard-user/${currentUser.slug}/source-catalog`);
		}
	}, [currentUser]);

	return (
		<div className="sources-wrap bookmark">
			<div className="sources-content-wrap align-md-center">
				<div className="sources-media d-shrink img-fit">
					<Image
						src={process.env.NEXT_PUBLIC_API_URL + user.photo}
						width={88}
						height={88}
						alt="source-photo"
						objectFit={'cover'}
					/>
				</div>
				<div className="sources-content">
					<Link href={cutQueryParamsFromURL(usersLink + '/' + user.slug)}>
						<a>
							<p className="p-big links-darkColor">
								{user.firstName} {user.lastName}, {user.countryShortName}
							</p>
						</a>
					</Link>
					<CustomRate
						color={'color-main2'}
						readOnly
						rating={user.rating}
						size={'xs'}
						allowHalf
					/>
				</div>
			</div>
			<div className="mt-0 ml-auto">
				<Button className="btn-icon" onClick={() => deleteHandler(user.id)}>
					<i className="ico ico-Trash fs-24" />
				</Button>
			</div>
		</div>
	);
};

export default BookmarkSourcer;
