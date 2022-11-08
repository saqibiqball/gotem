import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { getTransactionsForUser } from '@/http/transactionAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import UserTransactionTable from '@/components/Pages/Transactions/UserTransactionTable';
import DashboardLayout from '@/layouts/dashboard.layout';

const Index = () => {
	const router = useRouter();
	const limit = 10;
	const [fetching, setFetching] = useState(false);
	const [transactions, setTransactions] = useState({ rows: [], count: 0 });
	const activePage = useMemo(() => +router.query?.page || 1, [router]);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				setTransactions(await getTransactionsForUser(limit, activePage));
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetching(false);
		};
		fetchData();
	}, [activePage]);
	return (
		<section className="ls ms s-py-60">
			<MWT_Container fluid>
				<MWT_Row className="c-mb-20">
					<MWT_Col>
						<h6 className="mb-20">Payments</h6>
						<div className="ls p-35">
							<UserTransactionTable
								transactions={transactions.rows}
								fetching={fetching}
							/>
						</div>
					</MWT_Col>
					<MWT_Col>
						{transactions.count > limit && (
							<CustomPaginationRouter
								total={transactions.count}
								limit={limit}
								activePage={activePage}
							/>
						)}
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export default Index;
