import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useRequest from '@/hooks/useRequest';
import { gelPropertiesOfProposals, getAllProposals } from '@/http/proposalsAPI';
import { checkQueryArray } from '@/helpers/checkQueryArray';
import CustomNotice from '@/components/UI/CustomNotice';
import { handleFilter } from '@/helpers/handleFilter';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import ProposalFilter from '@/components/Pages/Proposals/ProposalFilter';
import CustomLoader from '@/components/UI/CustomLoader';
import ProposalsWrap from '@/components/Pages/Proposals/ProposalsWrap';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';

const Index = () => {
	const router = useRouter();
	const { missionId } = router.query;
	const { currentUser } = useSelector((state) => state.user);
	const [proposals, setProposals] = useState({ rows: [], count: 0 });
	const [fetch, setFetch] = useState(false);
	const [properties, isLoadingProperties] = useRequest(gelPropertiesOfProposals);
	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 6;

	const [filtersData] = useState({
		sort: router.query.sort || '',
		statusId: checkQueryArray(router.query, 'statusId').map((item) => +item),
	});

	const linkBack = () => {
		router.back();
	};

	useEffect(() => {
		let isSubscribe = true;
		const fetchData = async () => {
			setFetch(true);
			try {
				const data = await getAllProposals({
					missionId,
					limit,
					page: activePage,
					sort: filtersData.sort,
					statusId: filtersData.statusId,
				});
				setProposals(data);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		isSubscribe && missionId && fetchData();
		return () => (isSubscribe = false);
		// eslint-disable-next-line
	}, [missionId, router.query]);

	const handleSearch = (val = '', key = '') => {
		handleFilter(val, key, filtersData, router);
	};

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xl={10} className="ml-auto mr-auto">
						<MWT_Row className="c-mb-20  align-center">
							<MWT_Col lg={5}>
								<span
									className="fs-24 fw-500 links-darkColor cursor-pointer d-in-flex align-center"
									onClick={linkBack}
								>
									<i className="ico-Chevron-double-left mr-10" /> Back to missions
								</span>
							</MWT_Col>
							<MWT_Col lg={7}>
								{!isLoadingProperties && (
									<ProposalFilter
										formData={filtersData}
										handleSearch={handleSearch}
										properties={properties}
									/>
								)}
							</MWT_Col>
						</MWT_Row>
						<div className="divider-30" />
						{fetch ? <CustomLoader /> : <ProposalsWrap items={proposals.rows} />}
						{!fetch && !proposals.count && (
							<p>There are no proposals for this mission</p>
						)}
						<div className="divider-40" />
						<CustomPaginationRouter
							activePage={activePage}
							limit={limit}
							total={proposals.count}
							url={`/dashboard-user/${currentUser.slug}/my-missions/${missionId}/proposals`}
						/>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
