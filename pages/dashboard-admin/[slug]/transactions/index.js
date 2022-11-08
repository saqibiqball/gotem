import React, { useEffect, useMemo, useState } from 'react';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { getAllTransactions } from '@/http/transactionAPI';
import AdminTransactionTable from '@/components/Pages/Transactions/AdminTransactionTable';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import ModalAddTransaction from '@/components/Modals/ModalAddTransaction';
import { Button } from 'rsuite';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';

const Index = () => {
	const router = useRouter();
	const limit = 10;
	const [fetching, setFetching] = useState(false);
	const [transactions, setTransactions] = useState({ rows: [], count: 0 });
	const activePage = useMemo(() => +router.query?.page || 1, [router]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				setTransactions(await getAllTransactions(limit, activePage));
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

	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	const handler = async () => {
		await router.replace(cutQueryParamsFromURL(router.asPath), undefined, {
			shallow: true,
		});
	};

	return (
		<>
			<ModalAddTransaction
				modalShow={showModal}
				handlerModalClose={closeModal}
				handler={handler}
			/>
			<section className="ls ms s-py-60">
				<MWT_Container fluid>
					<MWT_Row className="c-mb-20">
						<MWT_Col>
							<div className="d-flex d-wrap">
								<h6 className="mb-20 mr-auto pr-20">Transactions</h6>
								<Button onClick={openModal} className="rs-btn-main mb-20">
									Make payment
								</Button>
							</div>
							<div className="ls p-35">
								<AdminTransactionTable
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
		</>
	);
};

Index.Layout = DashboardLayout;

export default Index;
