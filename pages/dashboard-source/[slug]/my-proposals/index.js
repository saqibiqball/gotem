import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useRequest from '@/hooks/useRequest';
import DashboardLayout from '@/layouts/dashboard.layout';
import { gelPropertiesOfProposals, getAllProposals } from '@/http/proposalsAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { checkQueryArray } from '@/helpers/checkQueryArray';
import { handleFilter } from '@/helpers/handleFilter';
import CustomLoader from '@/components/UI/CustomLoader';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import ProposalFilter from '@/components/Pages/Proposals/ProposalFilter';
import MyProposalsWrap from '@/components/Pages/Proposals/MyProposalsWrap';

const Index = () => {
	const router = useRouter();
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
		isSubscribe && fetchData();
		return () => (isSubscribe = false);
		// eslint-disable-next-line
	}, [router.query]);

	const handleSearch = (val = '', key = '') => {
		handleFilter(val, key, filtersData, router);
	};

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xl={10} className="ml-auto mr-auto">
						<MWT_Row className="c-mb-20  align-center">
							<MWT_Col lg={7} className="ml-auto">
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
						{fetch ? <CustomLoader /> : <MyProposalsWrap items={proposals.rows} />}
						{!fetch && !proposals.count && (
							<p>There are no proposals for this mission</p>
						)}
						<div className="divider-40" />
						<CustomPaginationRouter
							activePage={activePage}
							limit={limit}
							total={proposals.count}
							url={`/dashboard-user/${currentUser.slug}/my-proposals`}
						/>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
