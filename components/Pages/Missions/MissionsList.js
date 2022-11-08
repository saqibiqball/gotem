import React from 'react';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import MissionItem from '@/components/Pages/Missions/MissionsItem';

const MissionsList = ({ missions, showAuthor = true }) => {
	return (
		<MWT_Row className="c-mb-25">
			{missions.length > 0 ? (
				missions.map((mission) => (
					<MWT_Col key={mission.id}>
						<MissionItem mission={mission} showAuthor={showAuthor} />
					</MWT_Col>
				))
			) : (
				<MWT_Col>
					<h5>Cannot find anything</h5>
				</MWT_Col>
			)}
		</MWT_Row>
	);
};

export default MissionsList;
