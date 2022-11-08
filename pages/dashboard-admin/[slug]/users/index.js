import React, { useMemo, useState } from 'react';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import DashboardLayout from '@/layouts/dashboard.layout';
import FilterOfUsers from '@/components/Pages/DashboardAdmin/users/FilterOfUsers';
import { useRouter } from 'next/router';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import { useSelector } from 'react-redux';
import TableOfUsers from '@/components/Pages/DashboardAdmin/users/TableOfUsers';

const Users = () => {
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [users, setUsers] = useState({ count: 0, rows: [] });
	const [fetch, setFetch] = useState(false);
	const activePage = useMemo(() => +router.query?.page || 1, [router.query?.page]);
	const limit = 10;

	return (
		<section className="ls ms s-py-60">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<FilterOfUsers
							setUsers={setUsers}
							activePage={activePage}
							limit={limit}
							setFetch={setFetch}
						/>
						<div className="divider-40" />
						<TableOfUsers users={users} setUsers={setUsers} fetch={fetch} />
					</MWT_Col>
					<MWT_Col className="text-center">
						<div className="divider-40" />
						<CustomPaginationRouter
							activePage={activePage}
							limit={limit}
							total={users.count}
							url={`/dashboard-admin/${currentUser.slug}/users`}
						/>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Users.Layout = DashboardLayout;
export default Users;
