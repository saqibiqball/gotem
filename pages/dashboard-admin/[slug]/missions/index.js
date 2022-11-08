import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import DashboardLayout from '@/layouts/dashboard.layout';
import { checkQueryArray } from '@/helpers/checkQueryArray';
import { getAllMissions } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { handleFilter } from '@/helpers/handleFilter';
import CustomLoader from '@/components/UI/CustomLoader';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import MapComponent from '@/components/UI/GoogleMap/MapComponent';
import AdminMissionsList from '@/components/Pages/Missions/AdminMissionsList';
import AdminMissionsFilters from '@/components/Pages/Missions/AdminMissionsFilters';
import AdminMissionsSort from '@/components/Pages/Missions/AdminMissionsSort';

const Missions = () => {
	const router = useRouter();
	const zoom = 5;
	const { currentUser } = useSelector((state) => state.user);
	const [missions, setMissions] = useState({ count: 0, rows: [] });
	const [fetch, setFetch] = useState(false);
	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 10;
	const [filtersData, setFiltersData] = useState({
		search: router.query.search || '',
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
		registerRange: checkQueryArray(router.query, 'registerRange').map((t) => new Date(t)),
		// country: router.query.country || '',
		// licensed: router.query.licensed === '1' || false,
	});

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getAllMissions({
					search: filtersData.search,
					radius: filtersData.radius,
					locationLat: filtersData.locationLat,
					locationLng: filtersData.locationLng,
					categories: filtersData.categories,
					fundingType: filtersData.fundingType,
					missionType: filtersData.missionType,
					rateMin: filtersData.rateMin,
					rateMax: filtersData.rateMax,
					sort: filtersData.sort,
					dateFrom:
						filtersData.registerRange.length > 0 ? filtersData.registerRange[0] : '',
					dateTo:
						filtersData.registerRange.length > 0 ? filtersData.registerRange[1] : '',
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

	const handleSearch = (val = '', key = '') => {
		handleFilter(val, key, filtersData, router);
	};

	const cleanFilters = () => {
		handleFilter(
			'',
			'',
			{
				search: '',
				location: '',
				locationLat: null,
				locationLng: null,
				radius: null,
				categories: [],
				fundingType: null,
				missionType: null,
				rateMin: null,
				rateMax: null,
				sort: '',
			},
			router
		);
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
							<MWT_Row align_items={'center'} className="c-mb-20">
								<MWT_Col xxl={6}>
									<h6>Browse missions</h6>
								</MWT_Col>
								<MWT_Col xxl={6}>
									<AdminMissionsSort
										formData={filtersData}
										handleSearch={handleSearch}
									/>
								</MWT_Col>
							</MWT_Row>
							<div className="divider-35" />
							{fetch ? (
								<CustomLoader />
							) : (
								<AdminMissionsList missions={missions.rows} />
							)}
							<MWT_Row>
								<MWT_Col>
									<div className="divider-40 divider-xl-90" />
									<CustomPaginationRouter
										activePage={activePage}
										limit={limit}
										total={missions.count}
										url={`/dashboard-admin/${currentUser.slug}/loads`}
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
						<AdminMissionsFilters
							handleSearch={handleSearch}
							cleanFilters={cleanFilters}
							formData={filtersData}
							setFormData={setFiltersData}
						/>
					</MWT_Col>
					<MWT_Col xl={3} xxl={4} className="px-0 order-3">
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

Missions.Layout = DashboardLayout;

export default Missions;
