import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/dashboard.layout';
import { getProposal, updateProposal } from '@/http/proposalsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import ProposalAuthor from '@/components/Pages/Proposals/ProposalAuthor';
import ProposalDescription from '@/components/Pages/Proposals/ProposalDescription';
import ProposalMilestones from '@/components/Pages/Proposals/ProposalMilestones';
import { Button, ButtonGroup } from 'rsuite';
import NoticeModal from '@/components/Modals/NoticeModal';
import ProposalChat from '@/components/Pages/Proposals/ProposalChat';
import { useSelector } from 'react-redux';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';

const Index = () => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const { proposalId } = router.query;
	const [proposal, setProposal] = useState({});
	const [fetch, setFetch] = useState(false);
	const [error, setError] = useState('');
	const [modalShow, setModalShow] = useState(false);
	const isActive = proposal.statusId === 2 || proposal.statusId === 4;

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
				setError(e.response?.data?.message);
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

	const changeStatusOfProposal = async () => {
		try {
			await updateProposal({
				id: proposal.id,
				statusId: 3,
				missionId: router.query.missionId,
			});
			handlerModalClose();
			await router.replace({ query: router.query }, undefined, {
				shallow: true,
			});
			CustomNotice({
				content: `Proposal was declined`,
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
								catalog
							</div>
							{fetch && <CustomLoader />}
						</MWT_Col>
						{!fetch && (
							<MWT_Col xl={10} className="ml-auto mr-auto">
								{!error ? (
									<>
										<div className="ls p-30 bordered mb-20">
											<ProposalAuthor user={proposal.user} />
										</div>
										<div className="ls p-30 bordered mb-20">
											<ProposalDescription item={proposal} />
											{!proposal.isFixedPrice && (
												<ProposalMilestones
													milestones={proposal.milestones}
												/>
											)}
											<ButtonGroup>
												{proposal.statusId === 1 && (
													<>
														<div className="divider-30" />
														<Button
															className="rs-btn-main mr-15"
															onClick={() =>
																router.push(
																	`/dashboard-user/${currentUser.slug}/my-missions/${router.query.missionId}/proposals/${router.query.proposalId}/${proposal.milestones[0].id}/checkout`
																)
															}
														>
															accept offer
														</Button>
														<Button
															className="rs-btn-main2"
															onClick={handlerModalShow}
														>
															decline offer
														</Button>
													</>
												)}
												{isActive && (
													<>
														<div className="divider-30" />
														<Button
															className="rs-btn-main mr-15"
															onClick={() =>
																router.push(
																	cutQueryParamsFromURL(
																		router.asPath
																	) + '/accept-offer'
																)
															}
														>
															Show Info
														</Button>
													</>
												)}
											</ButtonGroup>
										</div>
										<div className="ls p-30 bordered">
											<ProposalChat user={proposal.user} />
										</div>
									</>
								) : (
									<p>{error}</p>
								)}
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
