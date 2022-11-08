import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAllMissions } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';

const FilterOfMissions = ({ setMissions, activePage, limit, setFetch }) => {
	const form = useRef();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [filtersData] = useState({
		sort: router.query.sort || '',
	});

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getAllMissions({
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

	return <div></div>;
};

export default FilterOfMissions;
