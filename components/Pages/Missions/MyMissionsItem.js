import React, { useState } from 'react';
import { Button } from 'rsuite';
import { useSelector } from 'react-redux';
import { deleteMission } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import NoticeModal from '@/components/Modals/NoticeModal';
import MissionItemContent from '@/components/Pages/Missions/MissionItemContent';

const MyMissionsItem = ({ mission }) => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [modalShow, setModalShow] = useState(false);

	const handleEdit = (data) => {
		router.push(`/dashboard-user/${currentUser.slug}/my-missions/edit-mission/${data.id}`);
	};

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const linkToProposals = () => {
		router.push(`/dashboard-user/${currentUser.slug}/my-missions/${mission.id}/proposals`);
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
						<h4 className="fw-400 fs-18 mr-auto pr-15 mb-20 d-inline-block">
							{mission.title}
						</h4>
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
					<Button className="rs-btn-main" onClick={linkToProposals}>
						View proposals
					</Button>
				</div>
			</div>
		</>
	);
};

export default MyMissionsItem;
