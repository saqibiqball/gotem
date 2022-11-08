import React, { useState } from 'react';
import { Button, ButtonGroup } from 'rsuite';
import { useRouter } from 'next/router';
import ProposalDescription from '@/components/Pages/Proposals/ProposalDescription';
import ProposalAuthor from '@/components/Pages/Proposals/ProposalAuthor';
import NoticeModal from '@/components/Modals/NoticeModal';
import CustomNotice from '@/components/UI/CustomNotice';
import { updateProposal } from '@/http/proposalsAPI';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';

const ProposalItem = ({ item }) => {
	const router = useRouter();
	const [modalShow, setModalShow] = useState(false);

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const lintToProposal = async () => {
		await router.push(`${cutQueryParamsFromURL(router.asPath)}/${item.id}`);
	};

	const changeStatusOfProposal = async () => {
		try {
			await updateProposal({ id: item.id, statusId: 5, missionId: router.query.missionId });
			handlerModalClose();
			await router.replace({ query: router.query }, undefined, {
				shallow: true,
			});
			CustomNotice({
				content: `Proposal ${item.title} was putted to archive`,
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
				handler={changeStatusOfProposal}
			/>
			<div className="proposal ls p-30 bordered mb-20">
				<ProposalAuthor user={item.user} />
				<div className="divider-30" />
				<ProposalDescription item={item} />
				<div className="divider-20" />
				<ButtonGroup>
					<Button className="rs-btn-main mr-15" onClick={lintToProposal}>
						read more
					</Button>
					{item.statusId !== 5 && (
						<Button className="rs-btn-main2" onClick={handlerModalShow}>
							add to archive
						</Button>
					)}
				</ButtonGroup>
			</div>
		</>
	);
};

export default ProposalItem;
