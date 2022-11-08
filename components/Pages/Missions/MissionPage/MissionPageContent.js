import React from 'react';
import MissionPageAuthor from '@/components/Pages/Missions/MissionPage/MissionPageAuthor';
import MapComponent from '@/components/UI/GoogleMap/MapComponent';
import { Button } from 'rsuite';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import ImagePreview from '@/components/UI/ImagePreview';

const MissionPageContent = ({ mission, hasProposal = false }) => {
	const zoom = 5;
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div className="ls px-32 py-32 bordered">
			<MissionPageAuthor user={mission.user} />
			<hr />
			<h6 className="mt-0">{mission.title}</h6>
			<div className="divider-30"></div>
			<h6 className="fs-16 mt-0">Mission Description</h6>
			<p className="text-with-br">{mission.description}</p>
			<div className="divider-30"></div>
			<h6 className="mt-0 fs-16">Mission Objectives</h6>
			<p className="text-with-br">{mission.objectives}</p>
			<div className="divider-30"></div>
			{mission.missionFiles?.length > 0 && (
				<>
					<h6 className="mt-0 mb-20 fs-16">Files:</h6>
					<MWT_Row>
						{mission.missionFiles.map((file) => (
							<MWT_Col key={file.id} lg={2}>
								<ImagePreview file={file} />
							</MWT_Col>
						))}
					</MWT_Row>
				</>
			)}
			<div className="divider-30"></div>
			<h6 className="fs-16 mt-0">Location</h6>
			<div style={{ width: '100%', height: '400px' }}>
				<MapComponent
					center={{
						lat: mission.locationLat,
						lng: mission.locationLng,
					}}
					zoom={zoom}
					items={[
						{
							id: mission.id,
							firstName: mission.title,
							lastName: '',
							lat: mission.locationLat,
							lng: mission.locationLng,
						},
					]}
				/>
			</div>
			<div className="divider-30"></div>
			{currentUser.roleId !== 1 && !hasProposal && (
				<Button
					className="rs-btn-main"
					onClick={() =>
						router.push(
							`/dashboard-source/${currentUser.slug}/mission-catalog/${mission.id}/create-proposal`
						)
					}
				>
					Apply to mission
				</Button>
			)}
		</div>
	);
};

export default MissionPageContent;
