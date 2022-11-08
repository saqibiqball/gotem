import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { getAllDoneMissionsWithReviews, getUserPage } from '@/http/userAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import SourcePageSideBar from '@/components/Pages/Sources/SourcerPage/SourcePageSideBar';
import SourcePageContent from '@/components/Pages/Sources/SourcerPage/SourcePageContent';
import SourcePageHeader from '@/components/Pages/Sources/SourcerPage/SourcePageHeader';
import ReportModal from '@/components/Modals/ReportModal';

const SourcePage = () => {
	const router = useRouter();
	const { sourceSlug } = router.query;
	const [user, setUser] = useState({});
	const [doneMissions, setDoneMissions] = useState({});
	const [fetch, setFetch] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		const fetchSourcer = async () => {
			setFetch(true);
			try {
				if (sourceSlug) {
					const userData = await getUserPage(sourceSlug);
					const doneMissionsData = await getAllDoneMissionsWithReviews(userData.id);
					setDoneMissions(doneMissionsData);
					setUser(userData);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchSourcer();
	}, [sourceSlug]);

	const handlerModalShow = () => {
		setModalShow(true);
	};

	const handlerModalClose = () => {
		setModalShow(false);
	};

	return (
		<>
			{!fetch && (
				<ReportModal
					modalShow={modalShow}
					user={user}
					handlerModalClose={handlerModalClose}
				/>
			)}

			<section className="sourcer-page s-py-50">
				<MWT_Container>
					{fetch && (
						<MWT_Row>
							<MWT_Col>
								<CustomLoader />
							</MWT_Col>
						</MWT_Row>
					)}
					{!fetch && (
						<>
							{Object.keys(user).length > 0 ? (
								<MWT_Row className="c-mb-30">
									<MWT_Col>
										<SourcePageHeader user={user} />
									</MWT_Col>
									<MWT_Col>
										<MWT_Row>
											<MWT_Col xl={7} xxl={8} className="order-2 order-xl-1">
												<SourcePageContent
													userBio={user.bio}
													userId={user.id}
													feedbackCompleted={doneMissions}
													feedbackInProgress={doneMissions}
													employments={user.employments}
												/>
											</MWT_Col>
											<MWT_Col xl={5} xxl={4} className="order-1 order-xl-2">
												<SourcePageSideBar
													user={user}
													handleReport={handlerModalShow}
												/>
											</MWT_Col>
										</MWT_Row>
									</MWT_Col>
								</MWT_Row>
							) : (
								<MWT_Row>
									<MWT_Col>
										<h6 className="text-center">User Not Found</h6>
									</MWT_Col>
								</MWT_Row>
							)}
						</>
					)}
				</MWT_Container>
			</section>
		</>
	);
};

SourcePage.Layout = DashboardLayout;

export default SourcePage;
