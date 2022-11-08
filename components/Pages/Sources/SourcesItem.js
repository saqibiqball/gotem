import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MWT_Col } from '@/components/UI/Grid';
import CustomRate from '@/components/UI/CustomRate';
import useDashboardLink from '@/hooks/useDashboardLink';

const SourcesItem = ({ user, publicPage= false }) => {
	const dashboardLink = useDashboardLink();
	const [itemLink, setItemLink] = useState('')

	useEffect(()=>{
		if (!publicPage){
			setItemLink(dashboardLink + '/source-catalog/' + user.slug)
		}else{
			setItemLink( 'freelancers/' + user.slug)
		}

	}, [])

	return (
		<MWT_Col md={6} lg={12}>
			<div className="ls sources-wrap bordered">
				<div className="sources-content-wrap">
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
						<Link href={itemLink}>
							<a>
								<p className="p-big color-darkColor">
									{user.firstName} {user.lastName}
								</p>
							</a>
						</Link>
						{user.showJobTitle && <p>{user.jobTitle}</p>}

						<CustomRate
							color={'color-main2'}
							readOnly
							rating={user.rating}
							size={'xs'}
							text={user.countReviews + ' reviews'}
							allowHalf
						/>
					</div>
				</div>
				<div className="sources-meta">
					<ul>
						<li>
							<span>Job success:</span> 96%
						</li>
						<li>
							<span>Rate:</span> $ {user.hourlyRate}/hr
						</li>
						<li>
							<span>Location:</span> {user.city}
							{user.administartiveArea.length > 0
								? ', ' + user.administartiveArea
								: ''}
						</li>
					</ul>
					<Link href={itemLink}>
						<a>View profile</a>
					</Link>
				</div>
			</div>
		</MWT_Col>
	);
};

export default SourcesItem;
