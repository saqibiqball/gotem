import React, { useEffect, useState } from 'react';
import ProposalFilter from '@/components/Pages/Proposals/ProposalFilter';
import CustomLoader from '@/components/UI/CustomLoader';
import ProposalsWrap from '@/components/Pages/Proposals/ProposalsWrap';
import { useRouter } from 'next/router';
import useRequest from '@/hooks/useRequest';
import { gelPropertiesOfProposals, getAllProposals } from '@/http/proposalsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomPagination from '@/components/UI/CustomPagination';

const ProposalsTab = () => {
	const router = useRouter();
	const { missionId } = router.query;
	const [proposals, setProposals] = useState({ rows: [], count: 0 });
	const [fetch, setFetch] = useState(false);
	const [properties, isLoadingProperties] = useRequest(gelPropertiesOfProposals);
	const [activePage, setActivePage] = useState(1);
	const limit = 6;

	const [filtersData, setFiltersData] = useState({
		sort: router.query.sort || '',
		statusId: null,
	});

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
	}, [missionId, activePage, filtersData]);

	const handleSearch = (val = '', key = '') => {
		setFiltersData((prevState) => ({ ...prevState, [key]: val }));
	};

	return (
		<>
			{!isLoadingProperties && (
				<ProposalFilter
					formData={filtersData}
					handleSearch={handleSearch}
					properties={properties}
				/>
			)}
			<div className="divider-30" />
			{fetch ? <CustomLoader /> : <ProposalsWrap items={proposals.rows} />}
			{!fetch && !proposals.count && <p>There are no proposals for this mission</p>}
			<div className="divider-40" />
			<CustomPagination
				activePage={activePage}
				limit={limit}
				total={proposals.count}
				setActivePage={setActivePage}
			/>
		</>
	);
};

export default ProposalsTab;
