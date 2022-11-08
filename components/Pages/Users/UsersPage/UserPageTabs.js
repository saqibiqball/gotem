import React, { useEffect, useMemo, useState } from 'react';
import { Nav } from 'rsuite';
import MissionsList from '@/components/Pages/Missions/MissionsList';
import UserPageFeedbacks from '@/components/Pages/Users/UsersPage/UserPageFeedbacks';
import { getAllMissions } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import { getUserFeedback } from '@/http/userAPI';

const UserPageTabs = ({ user }) => {
	const [active, setActive] = useState('missions');
	const [missions, setMissions] = useState({ rows: [], count: 0 });
	const [reviews, setReviews] = useState({ rows: [], count: 0 });
	const [fetch, setFetch] = useState(false);
	const router = useRouter();
	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 10;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const sourcesData = await getAllMissions({
					userId: user.id,
					page: activePage,
					limit,
				});
				const reviewData = await getUserFeedback(user.id);
				setMissions(sourcesData);
				setReviews(reviewData);
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

	const handleSelect = (activeKey) => {
		setActive(activeKey);
	};
	return (
		<div className="sourcer-page-tabs">
			<Nav activeKey={active} className="wrap" onSelect={handleSelect}>
				<Nav.Item eventKey="missions">
					Missions <span>({missions.count})</span>
				</Nav.Item>
				<Nav.Item eventKey="feedbacks">
					Feedbacks <span>({reviews.count})</span>
				</Nav.Item>
			</Nav>
			<div className="content pt-30">
				{active === 'feedbacks' && (
					<UserPageFeedbacks feedbacks={reviews} limit={limit} total={reviews.count} />
				)}
				{active === 'missions' && (
					<>
						<MissionsList missions={missions.rows} showAuthor={false} />
						<div className="divider-30"></div>
						<CustomPaginationRouter
							activePage={activePage}
							limit={limit}
							total={missions.count}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default UserPageTabs;
