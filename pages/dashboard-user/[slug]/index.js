import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import GroupChat from '@/components/GroupChat';
import { useRouter } from 'next/router';
import { getSources } from '@/http/userAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomLoader from '@/components/UI/CustomLoader';
import SourcesList from '@/components/Pages/Sources/SourcesList';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import SourcesSort from '@/components/Pages/Sources/SourcesSort';
import MapComponent from '@/components/UI/GoogleMap/MapComponent';
import { getAllMissions, getAllMissionsWithOutQuery } from '@/http/missionsAPI';

const Dashboard = () => {
	const router = useRouter();
	const [fetch, setFetch] = useState(false);
	const [sources, setSources] = useState(false);
	const [missions, setMissions] = useState([]);
	const [filtersData] = useState({
		sort: router.query.sort || '',
	});
	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 10;
	const zoom = 5;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const missionsData = await getAllMissionsWithOutQuery();
				console.log(missionsData);
				setMissions(missionsData);
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
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getSources({
					sort: filtersData.sort,
					page: activePage,
					limit,
				});
				setSources(sourcesData);
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
			} else {
				queryData[key] = filtersData[key];
			}
		});

		if (sort.length) {
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

	const missionsLocations = useMemo(() => {
		return (
			missions &&
			missions.length > 0 &&
			missions.map((mission) => {
				return {
					id: mission.id,
					text: `"${mission.title}" by ${mission.user.firstName} ${mission.user.lastName}`,
					lat: mission.locationLat,
					lng: mission.locationLng,
				};
			})
		);
	}, [missions]);

	return (
		<section className="p-relative section-dashboard h-100">
			<MWT_Container fluid className="px-0">
				<MWT_Row className="mx-0">
					<MWT_Col xl={9} xxl={8} className="px-30 py-55 px-xxl-65 ">
						<SourcesSort formData={filtersData} handleSearch={handleSearch} />
						<div className="divider-35" />
						{fetch && <CustomLoader />}
						{!fetch && sources && (
							<>
								<div className="divider-35" />
								<SourcesList users={sources.rows} />
							</>
						)}
						{!fetch && sources.count === 0 && (
							<MWT_Row>
								<MWT_Col>
									<h5>Cannot find anything</h5>
								</MWT_Col>
							</MWT_Row>
						)}
						<div className="divider-40 divider-xl-90" />
						<CustomPaginationRouter
							activePage={activePage}
							limit={limit}
							total={sources.count}
						/>
					</MWT_Col>
					<MWT_Col xl={3} xxl={4} className="px-0 order-3 p-relative">
						<GroupChat />
						<div className="h-100" style={{ width: '100%', height: '100%' }}>
							{fetch && <CustomLoader />}
							{!fetch && (
								<MapComponent
									radius={filtersData.radius}
									radiusCenter={{
										lat: +filtersData.locationLat,
										lng: +filtersData.locationLng,
									}}
									center={{
										lat: missions[0]?.locationLat,
										lng: missions[0]?.locationLng,
									}}
									zoom={zoom}
									items={missionsLocations}
								/>
							)}
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Dashboard.Layout = DashboardLayout;

export default Dashboard;
