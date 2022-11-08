import React, { useContext, useMemo, useState } from 'react';
import { Button, Loader } from 'rsuite';
import EvidencesFilesModal from '@/components/Modals/EvidencesFilesModal';
import b64ToBlob from 'b64-to-blob';
import { downloadZip } from '@/http/proposalsAPI';
import fileSaver from 'file-saver/dist/FileSaver';
import { useRouter } from 'next/router';
import { urlStepsBack } from '@/helpers/urlStepsBack';
import { changeStatusMilestone } from '@/http/milestonesAPI';
import NoticeModal from '@/components/Modals/NoticeModal';
import { ProposalContext } from '@/context/proposal';
import CustomNotice from '@/components/UI/CustomNotice';
import RejectMilestoneModal from '@/components/Modals/RejectMilestoneModal';
import { dateFormat } from '@/helpers/dateFormat';
import DisputeModal from '@/components/Modals/DisputeModal';

const AcceptOfferMilestonesButtonsUser = ({ milestone }) => {
	const router = useRouter();
	const [proposal, setProposal] = useContext(ProposalContext);
	const [modalShow, setModalShow] = useState(false);
	const [showModalAccept, setShowModalAccept] = useState(false);
	const [showModalDispute, setShowModalDispute] = useState(false);
	const [fetchAccept, setFetchAccept] = useState(false);
	const [showModalReject, setShowModalReject] = useState(false);
	const [fetchReject, setFetchReject] = useState(false);

	const showIsActiveBtn = useMemo(() => {
		return !proposal?.milestones?.some((m) => m.statusId === 2 || m.statusId === 3);
	}, [proposal?.milestones]);
	const showActiveBtn = milestone.statusId === 1 && showIsActiveBtn;

	const linkToPay = async () => {
		await router.push(`${urlStepsBack(router.asPath, 1)}/${milestone.id}/checkout`);
	};

	const handlerModalRejectShow = () => {
		setShowModalReject(true);
	};

	const handlerModalRejectClose = () => {
		setShowModalReject(false);
	};

	const handlerModalAcceptShow = () => {
		setShowModalAccept(true);
	};

	const handlerModalAcceptClose = () => {
		setShowModalAccept(false);
	};

	const handlerModalDisputeShow = () => {
		setShowModalDispute(true);
	};

	const handlerModalDisputeClose = () => {
		setShowModalDispute(false);
	};

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const handleDownloadZip = async (missionLink, folderLink, milestoneTitle) => {
		const data = await downloadZip(missionLink, folderLink);
		const blob = b64ToBlob(data, 'application/zip');
		fileSaver.saveAs(blob, milestoneTitle + ' (' + dateFormat(new Date()) + ')');
	};
	const acceptProposalHandler = async () => {
		setFetchAccept(true);
		try {
			const res = await changeStatusMilestone({
				proposalId: proposal.id,
				milestoneId: milestone.id,
				statusId: 4,
			});
			setProposal({ proposal, ...res });
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetchAccept(false);
		handlerModalAcceptClose();
	};

	const rejectProposalHandler = async () => {
		setFetchReject(true);
		try {
			const res = await changeStatusMilestone({
				proposalId: proposal.id,
				milestoneId: milestone.id,
				statusId: 2,
			});
			setProposal({ proposal, ...res });
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetchReject(false);
		handlerModalRejectClose();
	};

	return (
		<>
			<EvidencesFilesModal
				milestone={milestone}
				showModal={modalShow}
				closeModal={handlerModalClose}
			/>
			<NoticeModal
				showModal={showModalAccept}
				closeModal={handlerModalAcceptClose}
				handler={acceptProposalHandler}
			/>
			<RejectMilestoneModal
				handlerModalClose={handlerModalRejectClose}
				modalShow={showModalReject}
				handlerSend={rejectProposalHandler}
			/>
			<DisputeModal
				handlerModalClose={handlerModalDisputeClose}
				modalShow={showModalDispute}
				proposalId={proposal.id}
				milestoneId={milestone.id}
			/>
			<div className="milesestone-item-buttons">
				{showActiveBtn && (
					<Button
						appearance="ghost"
						className="rs-btn-main rs-btn-small"
						onClick={linkToPay}
					>
						Activate
					</Button>
				)}

				<>
					{milestone.statusId !== 1 && (
						<>
							<Button
								appearance="ghost"
								className="rs-btn-main rs-btn-small"
								onClick={handlerModalShow}
							>
								View
							</Button>
							<Button
								appearance="ghost"
								className="rs-btn-main rs-btn-small"
								disabled={!milestone.evidences?.evidenceFiles.length}
								onClick={() =>
									handleDownloadZip(
										'evidences/' + milestone.evidences.activationLink,
										'',
										milestone.title
									)
								}
							>
								Download
							</Button>
						</>
					)}

					{milestone.statusId !== 1 &&
						milestone.statusId !== 4 &&
						milestone.statusId !== 5 && (
							<Button
								className="rs-btn-main rs-btn-small"
								onClick={handlerModalAcceptShow}
								disabled={fetchAccept}
							>
								{fetchAccept ? <Loader size="xs" content="Loading" /> : 'Accept'}
							</Button>
						)}

					{milestone.statusId === 3 && (
						<Button
							className="rs-btn-main2 rs-btn-small"
							disabled={fetchReject}
							onClick={handlerModalRejectShow}
						>
							{fetchReject ? <Loader size="xs" content="Loading" /> : 'Reject'}
						</Button>
					)}
					{milestone.statusId === 4 && (
						<Button className="rs-btn-small" onClick={handlerModalDisputeShow}>
							Dispute
						</Button>
					)}
				</>
			</div>
		</>
	);
};

export default AcceptOfferMilestonesButtonsUser;
