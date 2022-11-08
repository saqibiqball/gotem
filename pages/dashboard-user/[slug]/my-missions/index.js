import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAllMissions } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import MissionsSort from '@/components/Pages/Missions/MissionsSort';
import CustomLoader from '@/components/UI/CustomLoader';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import MyMissionsList from '@/components/Pages/Missions/MyMissionsList';

const MyMissions = () => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [missions, setMissions] = useState({ rows: [], count: 0 });
	const [fetch, setFetch] = useState(false);
	const [filtersData] = useState({
		sort: router.query.sort || '',
	});
	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 6;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getAllMissions({
					userId: currentUser.id,
					sort: filtersData.sort,
					page: activePage,
					limit,
				});
				setMissions(sourcesData);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchData();
		// eslint-disable-next-line
	}, [router.query]);

	const handleSearch = (sort = '') => {
		let queryObj = { ...router.query, page: 1 };
		let queryData = {};

		Object.keys(filtersData).forEach((key) => {
			if (Array.isArray(filtersData[key])) {
				queryData[key] = filtersData[key].join(',').trim();
			} else if (typeof filtersData[key] === 'boolean') {
				queryData[key] = filtersData[key] ? 1 : 0;
			} else {
				queryData[key] = filtersData[key];
			}
		});

		if (sort && sort.length) {
			queryData['sort'] = sort;
		} else {
			delete queryObj['sort'];
		}

		Object.keys(queryData).forEach((key) => {
			if (
				(!queryData[key]?.length || queryData[key] === null) &&
				typeof queryData[key] !== 'number'
			) {
				delete queryData[key];
				delete queryObj[key];
			}
		});

		const QUERY = { ...queryObj, ...queryData };
		router.replace({ query: QUERY }, undefined, {
			shallow: true,
		});
	};

	return (
		<section>
			<MWT_Container fluid className="px-0">
				<MWT_Row className="mx-0">
					<MWT_Col className="py-30 px-30 py-xxl-55 px-xxl-65 order-2 order-xl-1 max-height-100 overflow-hidden">
						<MWT_Container className="px-0">
							<MWT_Row align_items={'center'}>
								<MWT_Col lg={6} xl={8}>
									<h6>Browse missions</h6>
								</MWT_Col>
								<MWT_Col lg={6} xl={4}>
									<MissionsSort
										formData={filtersData}
										handleSearch={handleSearch}
									/>
								</MWT_Col>
							</MWT_Row>
							<div className="divider-35" />
							{fetch ? <CustomLoader /> : <MyMissionsList missions={missions.rows} />}
							<MWT_Row>
								<MWT_Col>
									<div className="divider-40 divider-xl-90" />
									<CustomPaginationRouter
										activePage={activePage}
										limit={limit}
										total={missions.count}
										url={`/dashboard-user/${currentUser.slug}/my-missions`}
									/>
								</MWT_Col>
							</MWT_Row>
						</MWT_Container>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

MyMissions.Layout = DashboardLayout;
export default MyMissions;
