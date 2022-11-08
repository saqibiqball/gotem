import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSourcesByMissionCats } from '@/http/userAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomLoader from '@/components/UI/CustomLoader';
import SourcesList from '@/components/Pages/Sources/SourcesList';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import CustomPagination from '@/components/UI/CustomPagination';

const ProposalsMatchLevelTab = () => {
	const router = useRouter();
	const { missionId } = router.query;
	const [fetch, setFetch] = useState(false);
	const [sources, setSources] = useState({ rows: [], count: 0 });
	const [activePage, setActivePage] = useState(1);
	const limit = 10;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getSourcesByMissionCats(
					{
						page: activePage,
						limit,
					},
					missionId
				);
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
	}, [activePage]);

	return (
		<>
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
			<div className="divider-40" />
			<CustomPagination
				activePage={activePage}
				limit={limit}
				total={sources.count}
				setActivePage={setActivePage}
			/>
		</>
	);
};

export default ProposalsMatchLevelTab;
