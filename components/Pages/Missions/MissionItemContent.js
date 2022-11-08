import React, { useMemo } from 'react';
import { Tag, TagGroup } from 'rsuite';
import dateHelpers from '@/helpers/dateHelpers';
import WaterDropIcon from '@/components/Svg/WaterDropIcon';
import More from '@/components/UI/More';

const MissionItemContent = ({ mission }) => {
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
		</>
	);
};

export default MissionItemContent;
