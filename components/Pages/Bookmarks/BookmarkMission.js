import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tag, TagGroup } from 'rsuite';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';
import CustomRate from '@/components/UI/CustomRate';
import WaterDropIcon from '@/components/Svg/WaterDropIcon';
import More from '@/components/UI/More';
import dateHelpers from '@/helpers/dateHelpers';

const BookmarkMission = ({ mission, deleteHandler }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [usersLink, setUsersLink] = useState('');

	useEffect(() => {
		if (currentUser.roleId === 3) {
			setUsersLink(`/dashboard-source/${currentUser.slug}/mission-catalog`);
		} else {
			setUsersLink(`/dashboard-user/${currentUser.slug}/mission-catalog`);
		}
	}, [currentUser, mission]);

	const isNew = useMemo(() => {
		if (Object.keys(mission).length > 0) {
			const dateCheck = dateHelpers.getDateXDaysAgo(-10);
			return new Date(mission.createdAt) < new Date(dateCheck);
		}
		return false;
	}, [mission]);

	const daysLeft = useMemo(() => {
		if (Object.keys(mission).length > 0) {
			return dateHelpers.getDaysBetweenTwoDates(mission.deadline, Date.now());
		}
		return 0;
	}, [mission]);

	return (
		<>
			{Object.keys(mission).length > 0 && (
				<div className="bookmark case-item">
					<div className="d-flex d-wrap mr-auto">
						<Link href={cutQueryParamsFromURL(usersLink + '/' + mission.id)}>
							<a className="mr-auto pr-15 mb-20">
								<h4 className="fw-400 fs-18 links-darkColor d-inline-block">
									{mission.title}
								</h4>
							</a>
						</Link>
						<div className="mb-20">
							<Button className="btn-icon" onClick={() => deleteHandler(mission.id)}>
								<i className="ico ico-Trash fs-24" />
							</Button>
						</div>
					</div>
					<ul className="case-list">
						{isNew && (
							<li className="d-in-flex align-center">
								<div className="badge">new</div>
							</li>
						)}
						{mission.missionFundingTypeId === 2 ? (
							<>
								<li>Active crowdfund</li>
								<li>
									<i className="ico ico-View-boards" /> <span>8 sources</span>
								</li>
							</>
						) : (
							<li>${mission.estimatedBudget}</li>
						)}
						{daysLeft > 0 && (
							<li>
								<i className="ico ico-Calendar" /> <span>{daysLeft}d left</span>
							</li>
						)}
						{mission.missionFundingTypeId === 2 && (
							<li className="d-in-flex align-center">
								<WaterDropIcon /> <span>$84,579 raised</span>
							</li>
						)}
					</ul>
					{mission.description.length > 0 && (
						<>
							<div className="mt-20" />
							<More elem={mission} text={mission.description} number={350} />
						</>
					)}
					{mission.cats && mission.cats.length > 0 && (
						<>
							<div className="mt-20" />
							<TagGroup>
								{mission.cats.map((cat) => (
									<Tag key={'cat_' + cat.id}>{cat.name}</Tag>
								))}
							</TagGroup>
						</>
					)}
					<div className="divider-20" />
					<ul className="case-list align-center">
						<li>
							<div className="author">
								<div className="image d-in-flex d-shrink img-fit">
									<Image
										src={process.env.NEXT_PUBLIC_API_URL + mission.user.photo}
										width={56}
										height={56}
										alt="author-photo"
										objectFit={'cover'}
									/>
								</div>
								<div className="author-content">
									<Link
										href={`/dashboard-source/${currentUser.slug}/mission-catalog/${mission.id}/author/${mission.user.slug}`}
									>
										<a>
											<h5 className="fs-14 fw-400">
												{mission.user.firstName} {mission.user.lastName}
											</h5>
										</a>
									</Link>
								</div>
							</div>
						</li>
						<li>
							<i className="ico-Location-marker" />{' '}
							<span className="fs-14">{mission.user.location}</span>
						</li>
						{mission.user.rating > 0 && (
							<li>
								<CustomRate
									color={'color-main'}
									readOnly
									rating={mission.user.rating}
									size={'xs'}
									text={'reviews'}
									allowHalf
								/>
							</li>
						)}
					</ul>
				</div>
			)}
		</>
	);
};

export default BookmarkMission;
