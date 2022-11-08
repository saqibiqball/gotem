import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/dashboard.layout';
import { getAllMissions } from '@/http/missionsAPI';
import { checkQueryArray } from '@/helpers/checkQueryArray';
import MissionsList from '@/components/Pages/Missions/MissionsList';
import MissionsSort from '@/components/Pages/Missions/MissionsSort';
import MissionsFilters from '@/components/Pages/Missions/MissionsFilters';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomLoader from '@/components/UI/CustomLoader';
import MapComponent from '@/components/UI/GoogleMap/MapComponent';
import GroupChat from '@/components/GroupChat';

const MissionCatalog = () => {
	const router = useRouter();
	const zoom = 5;
	const [missions, setMissions] = useState({ rows: [], count: 0 });
	const [fetch, setFetch] = useState(false);
	const [filtersData, setFiltersData] = useState({
		location: router.query.location || '',
		locationLat: router.query.locationLat || null,
		locationLng: router.query.locationLng || null,
		radius: router.query.radius || null,
		categories: checkQueryArray(router.query, 'categories').map((item) => +item),
		fundingType: +router.query.fundingType || null,
		missionType: +router.query.missionType || null,
		rateMin: +router.query.rateMin || null,
		rateMax: +router.query.rateMax || null,
		sort: router.query.sort || '',
		// country: router.query.country || '',
		// licensed: router.query.licensed === '1' || false,
	});

	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 6;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getAllMissions({
					radius: filtersData.radius,
					locationLat: filtersData.locationLat,
					locationLng: filtersData.locationLng,
					categories: filtersData.categories,
					fundingType: filtersData.fundingType,
					missionType: filtersData.missionType,
					rateMin: filtersData.rateMin,
					rateMax: filtersData.rateMax,
					sort: filtersData.sort,
					page: activePage,
					limit,
					// country: filtersData.country,
					// licensed: filtersData.licensed,
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

	const missionsLocations = useMemo(() => {
		return (
			missions.rows &&
			missions.rows.length > 0 &&
			missions.rows.map((mission) => {
				return {
					id: mission.id,
					text: `"${mission.title}" by ${mission.user.firstName} ${mission.user.lastName}`,
					lat: mission.locationLat,
					lng: mission.locationLng,
				};
			})
		);
	}, [missions]);

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
					<MWT_Col
						xl={6}
						xxl={6}
						className="py-30 px-30 py-xxl-55 px-xxl-65 order-2 order-xl-1 max-height-100 overflow-hidden"
					>
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
							{fetch ? <CustomLoader /> : <MissionsList missions={missions.rows} />}
							<MWT_Row>
								<MWT_Col>
									<div className="divider-40 divider-xl-90" />
									<CustomPaginationRouter
										activePage={activePage}
										limit={limit}
										total={missions.count}
									/>
								</MWT_Col>
							</MWT_Row>
						</MWT_Container>
					</MWT_Col>
					<MWT_Col
						xl={3}
						xxl={2}
						className="ls py-30 px-30 py-xxl-55 px-xxl-35 order-1 order-xl-2 col-h-100 border-xl-left"
					>
						<MissionsFilters
							handleSearch={handleSearch}
							formData={filtersData}
							setFormData={setFiltersData}
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
										lat:
											+filtersData.locationLat ||
											missions.rows[0]?.locationLat,
										lng:
											+filtersData.locationLng ||
											missions.rows[0]?.locationLng,
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

MissionCatalog.Layout = DashboardLayout;

export default MissionCatalog;
