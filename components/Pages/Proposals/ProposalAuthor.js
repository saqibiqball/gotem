import React from 'react';
import { Tag, TagGroup } from 'rsuite';
import Image from 'next/image';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomRate from '@/components/UI/CustomRate';

const ProposalAuthor = ({ user }) => {
	return (
		<div className="content">
			<MWT_Row className="c-mb-20">
				<MWT_Col md={7} xl={6} xxl={4}>
					<div className="author d-flex align-center">
						<div className="img-fit d-in-flex rounded-circle overflow-hidden mr-20 d-shrink">
							<Image
								src={process.env.NEXT_PUBLIC_API_URL + user?.photo}
								quality={100}
								width={88}
								height={88}
								alt={'photo'}
							/>
						</div>
						<div>
							<h5 className="fs-18 fw-400">
								{user?.firstName} {user?.lastName}
							</h5>
							{user?.rating > 0 && (
								<CustomRate
									readOnly
									size={'xs'}
									allowHalf
									rating={user?.rating}
									color="color-main2"
								/>
							)}
						</div>
					</div>
				</MWT_Col>
				<MWT_Col md={5} xl={5} xxl={4}>
					<div className="meta">
						<ul className="list-unstyled small-list fs-14">
							<li>
								<span className="color-darkColor mr-5">Job success:</span> 96%
							</li>
							<li>
								<span className="color-darkColor mr-5">Rate:</span> $
								{user?.hourlyRate}/hr
							</li>
							<li>
								<span className="color-darkColor mr-5">Location:</span>
								{user?.location}
							</li>
						</ul>
					</div>
				</MWT_Col>
			</MWT_Row>
			<hr />
			{user?.skills && user?.skills.length > 0 && (
				<TagGroup>
					{user?.skills.map((skill) => (
						<Tag key={'skill_' + skill.id}>{skill.name}</Tag>
					))}
				</TagGroup>
			)}
		</div>
	);
};

export default ProposalAuthor;
