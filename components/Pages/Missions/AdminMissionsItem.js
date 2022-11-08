import React, { useState } from 'react';
import { Button } from 'rsuite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteMission } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import NoticeModal from '@/components/Modals/NoticeModal';
import MissionItemContent from '@/components/Pages/Missions/MissionItemContent';
import MissionItemAuthor from '@/components/Pages/Missions/MissionItemAuthor';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';

const MyMissionsItem = ({ mission }) => {
	const router = useRouter();
	const [modalShow, setModalShow] = useState(false);

	const handleEdit = async (data) => {
		await router.push(`${cutQueryParamsFromURL(router.asPath)}/${data.id}/edit-mission/`);
	};

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const linkToProposals = async () => {
		await router.push(`${cutQueryParamsFromURL(router.asPath)}/${mission.id}/proposals`);
	};

	const handleDelete = async () => {
		try {
			await deleteMission(mission.id);
			handlerModalClose();
			await router.replace({ query: router.query }, undefined, {
				shallow: true,
			});
			CustomNotice({
				content: `Mission ${mission.title} was deleted`,
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	return (
		<>
			<NoticeModal
				showModal={modalShow}
				closeModal={handlerModalClose}
				handler={handleDelete}
			/>
			<div className="case-item bordered ls">
				<div className="content">
					<div className="d-flex d-wrap">
						<Link href={`${cutQueryParamsFromURL(router.asPath)}/${mission.id}`}>
							<a className="mr-auto pr-15 mb-20 d-inline-block">
								<h4 className="fw-400 fs-18 links-darkColor">{mission.title}</h4>
							</a>
						</Link>

						<div className="fs-18 mb-20 cursor-pointer">
							<i
								className="ico-Pencil mr-15 links-darkColor"
								onClick={() => handleEdit(mission)}
							/>
							<i className="ico-Trash links-darkColor" onClick={handlerModalShow} />
						</div>
					</div>
					<MissionItemContent mission={mission} />
				</div>
				<div className="content">
					<MissionItemAuthor user={mission.user} missionId={mission.id} />
				</div>
				<div className="content">
					<Button className="rs-btn-main" onClick={linkToProposals}>
						View proposals
					</Button>
				</div>
			</div>
		</>
	);
};

export default MyMissionsItem;
