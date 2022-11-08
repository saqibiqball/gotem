import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { getDisputes, updateDispute } from '@/http/disputesAPI';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import CustomPaginationRouter from '@/components/UI/CustomPaginationRouter';
import TableOfDisputes from '@/components/Pages/DashboardAdmin/disputes/TableOfDisputes';
import NoticeModal from '@/components/Modals/NoticeModal';
import { cutQueryParamsFromURL } from '@/helpers/cutQueryParamsFromURL';

const Index = () => {
	const router = useRouter();
	const limit = 10;
	const [fetching, setFetching] = useState(false);
	const [disputes, setDisputes] = useState({ rows: [], count: 0 });
	const [activeDispute, setActiveDispute] = useState({});
	const activePage = useMemo(() => +router.query?.page || 1, [router]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setFetching(true);
			try {
				setDisputes(await getDisputes(limit, activePage));
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

	const openModal = (dispute) => {
		setActiveDispute(dispute);
		setShowModal(true);
	};
	const closeModal = () => setShowModal(false);

	const handler = async () => {
		setFetching(true);
		try {
			await updateDispute({
				disputeId: activeDispute.id,
				milestoneId: activeDispute.milestoneId,
				proposalId: activeDispute.milestone.proposalsId,
			});
			CustomNotice({
				content: 'Dispute was resolve',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
		closeModal();
		await router.replace(cutQueryParamsFromURL(router.asPath), undefined, {
			shallow: true,
		});
	};

	return (
		<>
			<NoticeModal showModal={showModal} closeModal={closeModal} handler={handler} />
			<section className="ls ms s-py-60">
				<MWT_Container fluid>
					<MWT_Row className="c-mb-20">
						<MWT_Col>
							<div className="d-flex d-wrap">
								<h6>Disputes</h6>
							</div>
							<div className="divider-20"></div>
							<div className="ls p-35">
								<TableOfDisputes
									disputes={disputes.rows}
									fetching={fetching}
									openModal={openModal}
								/>
							</div>
						</MWT_Col>
						<MWT_Col>
							{disputes.count > limit && (
								<CustomPaginationRouter
									total={disputes.count}
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
