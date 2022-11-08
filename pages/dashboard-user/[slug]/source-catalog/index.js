import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/dashboard.layout';
import { getSources } from '@/http/userAPI';
import SourcesList from '@/components/Pages/Sources/SourcesList';
import SourcesSort from '@/components/Pages/Sources/SourcesSort';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomLoader from '@/components/UI/CustomLoader';
import CustomNotice from '@/components/UI/CustomNotice';
import SourcesFilters from '@/components/Pages/Sources/SourcesFilters';
import { checkQueryArray } from '@/helpers/checkQueryArray';

const SourceCatalog = () => {
	const router = useRouter();
	const [fetch, setFetch] = useState(false);
	const [sources, setSources] = useState(false);
	const [filtersData, setFiltersData] = useState({
		country: router.query.country || '',
		location: router.query.location || '',
		locationLat: router.query.locationLat || null,
		locationLng: router.query.locationLng || null,
		radius: router.query.radius || null,
		rating: router.query.rating || null,
		rateMin: router.query.rateMin || null,
		rateMax: router.query.rateMax || null,
		categories: checkQueryArray(router.query, 'categories').map((item) => +item),
		sourceType: router.query.sourceType || '',
		sort: router.query.sort || '',
	});

	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 10;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getSources({
					country: filtersData.country,
					radius: filtersData.radius,
					rating: filtersData.rating,
					rateMin: filtersData.rateMin,
					locationLat: filtersData.locationLat,
					locationLng: filtersData.locationLng,
					sort: filtersData.sort,
					rateMax: filtersData.rateMax,
					categories: filtersData.categories,
					sourceType: filtersData.sourceType,
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

	return (
		<section>
			<MWT_Container fluid className="px-0">
				<MWT_Row className="mx-0">
					<MWT_Col
						xxl={10}
						xl={9}
						className="py-30 px-30 py-xxl-55 px-xxl-65 order-2 order-xl-1"
					>
						<MWT_Container className="px-0">
							<MWT_Row align_items={'center'}>
								<MWT_Col lg={5}>
									<h6>Browse sources</h6>
								</MWT_Col>
								<MWT_Col lg={7}>
									<SourcesSort
										formData={filtersData}
										handleSearch={handleSearch}
									/>
								</MWT_Col>
							</MWT_Row>
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
						</MWT_Container>
					</MWT_Col>
					<MWT_Col
						xxl={2}
						xl={3}
						className="ls py-30 px-30 py-xxl-55 px-xxl-35 order-1 order-xl-2 border-xl-left"
					>
						<SourcesFilters
							formData={filtersData}
							setFormData={setFiltersData}
							handleSearch={handleSearch}
						/>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

SourceCatalog.Layout = DashboardLayout;

export default SourceCatalog;
