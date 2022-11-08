import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllDoneMissionsWithReviews, getUserPage } from '@/http/userAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import SourcePageSideBar from '@/components/Pages/Sources/SourcerPage/SourcePageSideBar';
import SourcePageContent from '@/components/Pages/Sources/SourcerPage/SourcePageContent';
import SourcePageHeader from '@/components/Pages/Sources/SourcerPage/SourcePageHeader';
import ReportModal from '@/components/Modals/ReportModal';
import PagesLayout from '@/layouts/pages.layout';

const SourcePage = ({	userData, doneMissionsData}) => {
	const router = useRouter();
	const { sourceSlug } = router.query;
	const [user, setUser] = useState({});
	const [doneMissions, setDoneMissions] = useState({});
	const [fetch, setFetch] = useState(false);
	const [modalShow, setModalShow] = useState(false);

	useEffect(() => {
		setFetch(true)
		setUser(userData)
		setDoneMissions(doneMissionsData)
		setFetch(false)
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

			<section className="sourcer-page s-py-50 ls ms">
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

SourcePage.Layout = PagesLayout;

export async function getServerSideProps({params}) {
	const userData = await getUserPage(params.sourceSlug);
	const doneMissionsData = await getAllDoneMissionsWithReviews(userData.id);
	return {
		props: {
			userData,
			doneMissionsData
		},
	};
}

export default SourcePage;
