import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import { getTransactionsForFreelancer } from '@/http/transactionAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import SourceTransactionTable from '@/components/Pages/Transactions/SourceTransactionTable';
import { useSelector } from 'react-redux';

const Index = () => {
	const router = useRouter();
	const limit = 10;
	const [fetching, setFetching] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const [transactions, setTransactions] = useState({ rows: [], count: 0 });
	const activePage = useMemo(() => +router.query?.page || 1, [router]);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				setTransactions(await getTransactionsForFreelancer(limit, activePage));
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
						<h6 className="mb-20 fs-24">Payments</h6>
						<div className=" fs-18 d-flex d-wrap">
							<span className="mr-15">
								<span className="color-darkColor">Pending balance</span>{' '}
								<span className="color-main2">${currentUser.pendingBalance}</span>
							</span>
							<span>
								<span className="color-darkColor">Available balance</span>{' '}
								<span className="color-main2">${currentUser.availableBalance}</span>
							</span>
						</div>
						<div className="divider-30" />
						<div className="ls p-35">
							<SourceTransactionTable
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
