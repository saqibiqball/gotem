import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { getProposalActive } from '@/http/proposalsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import CustomLoader from '@/components/UI/CustomLoader';
import AcceptOfferHeader from '@/components/Pages/AcceptOffer/AcceptOfferHeader';
import AcceptOfferMilestonesInWork from '@/components/Pages/AcceptOffer/AcceptOfferMilestonesInWork';
import AcceptOfferMilestonesDone from '@/components/Pages/AcceptOffer/AcceptOfferMilestonesDone';
import { ProposalContext } from '@/context/proposal';
import ReviewModal from '@/components/Modals/ReviewModal';
import { Button } from 'rsuite';

const Index = () => {
	const router = useRouter();
	const [proposal, setProposal] = useState({});
	const [fetch, setFetch] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const { proposalId } = router.query;

	const isHasReview = useMemo(() => {
		return proposal?.mission?.review.some((r) => r.receiverId === proposal?.userId);
	}, [proposal]);

	useEffect(() => {
		let isSubscribe = true;
		const fetchData = async () => {
			if (proposalId) {
				setFetch(true);
				try {
					const data = await getProposalActive(proposalId);
					setProposal(data);
				} catch (e) {
					CustomNotice({
						content: e.response?.data?.message,
						type: 'error',
					});
				}
				setFetch(false);
			}
		};
		isSubscribe && fetchData();
		return () => (isSubscribe = false);
		// eslint-disable-next-line
	}, [proposalId]);

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	if (fetch) {
		return <CustomLoader />;
	}

	return (
		<>
			<ReviewModal
				modalShow={modalShow}
				handlerModalClose={handlerModalClose}
				missionId={proposal.missionId}
				proposalId={proposal.id}
				receiverId={proposal?.userId}
				setProposal={setProposal}
			/>
			{!fetch && Object.keys(proposal).length > 0 && (
				<section className="s-py-45">
					<ProposalContext.Provider value={[proposal, setProposal]}>
						<MWT_Container>
							<MWT_Row className="c-mb-30">
								<MWT_Col>
									<AcceptOfferHeader />
								</MWT_Col>
								<MWT_Col>
									<div className="ls">
										<AcceptOfferMilestonesInWork />
										<hr className="mt-0 mb-0" />
										<AcceptOfferMilestonesDone />
									</div>
									<div className="divider-30"></div>
									{!isHasReview && proposal.statusId === 4 && (
										<Button
											onClick={handlerModalShow}
											className="rs-btn-main rs-btn-small"
										>
											Send Review
										</Button>
									)}
									{isHasReview && (
										<h6 className="fs-16">You have already send review</h6>
									)}
								</MWT_Col>
							</MWT_Row>
						</MWT_Container>
					</ProposalContext.Provider>
				</section>
			)}
		</>
	);
};

Index.Layout = DashboardLayout;

export default Index;
