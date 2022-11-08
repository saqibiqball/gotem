import React from 'react';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import AdminMissionsItem from '@/components/Pages/Missions/AdminMissionsItem';

const AdminMissionsList = ({ missions }) => {
	return (
		<MWT_Row className="c-mb-25">
			{missions.length > 0 ? (
				missions.map((mission) => (
					<MWT_Col key={mission.id}>
						<AdminMissionsItem mission={mission} />
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

export default AdminMissionsList;
