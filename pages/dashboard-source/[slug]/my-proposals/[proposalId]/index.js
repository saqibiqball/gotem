import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import { getProposal, updateProposal } from '@/http/proposalsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import NoticeModal from '@/components/Modals/NoticeModal';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import ProposalDescription from '@/components/Pages/Proposals/ProposalDescription';
import ProposalMilestones from '@/components/Pages/Proposals/ProposalMilestones';
import { Button, ButtonGroup } from 'rsuite';
import ProposalChat from '@/components/Pages/Proposals/ProposalChat';
import MissionItemAuthor from '@/components/Pages/Missions/MissionItemAuthor';
import { useSelector } from 'react-redux';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';

const Index = () => {
	const router = useRouter();
	const { proposalId } = router.query;
	const { currentUser } = useSelector((state) => state.user);
	const [proposal, setProposal] = useState({});
	const [fetch, setFetch] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		let isSubscribe = true;
		const fetchData = async () => {
			setFetch(true);
			try {
				const data = await getProposal(proposalId);
				setProposal(data);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		isSubscribe && proposalId && fetchData();
		return () => (isSubscribe = false);
		// eslint-disable-next-line
	}, [proposalId]);

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	const linkBack = () => {
		router.back();
	};

	const lintToEditProposal = () => {
		router.push(
			`/dashboard-source/${currentUser.slug}/my-proposals/${proposal.id}/edit-proposal`
		);
	};

	const changeStatusOfProposal = async () => {
		try {
			await updateProposal({ id: proposal.id, statusId: 3 });
			handlerModalClose();
			await router.replace({ query: router.query }, undefined, {
				shallow: true,
			});
			CustomNotice({
				content: `Proposal ${proposal.title} was declined`,
			});
			linkBack();
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
			<section className="s-py-50">
				<MWT_Container>
					<MWT_Row className="c-mb-10">
						<MWT_Col xl={10} className="ml-auto mr-auto">
							<div
								className="fs-24 fw-500 mb-30 links-darkColor cursor-pointer d-in-flex align-center"
								onClick={linkBack}
							>
								<i className="ico-Chevron-double-left mr-10" /> Back to my proposals
							</div>
							{fetch && <CustomLoader />}
						</MWT_Col>
						{!fetch && (
							<MWT_Col xl={10} className="ml-auto mr-auto">
								<div className="ls p-30 bordered mb-20 case-item">
									<MissionItemAuthor user={proposal.mission?.user} />
								</div>
								<div className="ls p-30 bordered mb-20">
									<ProposalDescription item={proposal} />
									{!proposal.isFixedPrice && (
										<ProposalMilestones milestones={proposal.milestones} />
									)}
									<div className="divider-30" />
									<ButtonGroup>
										{proposal.statusId !== 1 && proposal.statusId !== 5 && (
											<Button
												onClick={() =>
													router.push(
														cutQueryParamsFromURL(router.asPath) +
															'/accept-offer'
													)
												}
												className="rs-btn-main mr-15"
											>
												show Info
											</Button>
										)}
										{proposal.statusId === 1 && (
											<>
												<Button
													className="rs-btn-main mr-15"
													onClick={lintToEditProposal}
												>
													edit offer
												</Button>
												<Button
													className="rs-btn-main2"
													onClick={handlerModalShow}
												>
													decline offer
												</Button>
											</>
										)}
									</ButtonGroup>
								</div>
								<div className="ls p-30 bordered">
									<ProposalChat user={proposal.mission?.user} />
								</div>
							</MWT_Col>
						)}
					</MWT_Row>
				</MWT_Container>
			</section>
		</>
	);
};

Index.Layout = DashboardLayout;

export default Index;
