import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import CustomField from '@/components/UI/CustomField';
import { Button, DateRangePicker, Form, SelectPicker } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import { getAllUsers, getRoles, getStatuses } from '@/http/userAPI';
import { useSelector } from 'react-redux';
import useRequest from '@/hooks/useRequest';

const FilterOfUsers = ({ setUsers, activePage, limit, setFetch }) => {
	const form = useRef();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [rolesData, loading1] = useRequest(getRoles);
	const [statusData, loading2] = useRequest(getStatuses);
	const [formData, setFormData] = useState({
		search: router.query.search || '',
		status: router.query.status || null,
		role: router.query.role || null,
		registerRange: checkQueryArray('registerRange'),
	});

	const isLoading = !loading2 && !loading1;

	useEffect(() => {
		const fetchData = async () => {
			setFetch(true);
			try {
				const usersData = await getAllUsers({
					status: formData.status,
					search: formData.search,
					dateFrom: formData.registerRange.length > 0 ? formData.registerRange[0] : '',
					dateTo: formData.registerRange.length > 0 ? formData.registerRange[1] : '',
					role: formData.role,
					page: activePage,
					limit,
				});
				setUsers(usersData);
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

	function checkQueryArray(key) {
		return key in router.query ? router.query[key].split(',').map((t) => new Date(t)) : [];
	}

	const createUser = () => {
		router.push(`/dashboard-admin/${currentUser.slug}/users/add-user`);
	};

	const handleSearch = (key, data) => {
		let queryObj = { ...router.query, page: 1 };
		let queryData = {};
		if (Array.isArray(data)) {
			queryData[key] = data.join(',').trim();
		} else {
			queryData[key] = data;
		}

		Object.keys(queryData).forEach((key) => {
			if (!queryData[key]?.length || queryData[key] === null) {
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
		<>
			{isLoading && (
				<div className="ls shadow rounded p-30 filters">
					<Form ref={form}>
						<MWT_Row className="c-mb-20">
							<MWT_Col xxl={7}>
								<MWT_Row>
									<MWT_Col lg={3}>
										<Button block className="rs-btn-main" onClick={createUser}>
											Create user
										</Button>
									</MWT_Col>
									<MWT_Col md={4} lg={3}>
										<CustomField
											accepter={SelectPicker}
											placeholder="User Status"
											name="statuses"
											data={statusData}
											valueKey="name"
											labelKey="name"
											searchable={false}
											value={formData.status}
											onChange={(val) => {
												handleSearch('status', val);
											}}
										/>
									</MWT_Col>
									<MWT_Col md={4} lg={3}>
										<CustomField
											className="f-grow"
											isoWeek={true}
											accepter={DateRangePicker}
											placeholder="Register Date Range"
											name="registerRange"
											value={formData.registerRange}
											onChange={(val) => {
												handleSearch('registerRange', val || []);
											}}
										/>
									</MWT_Col>
									<MWT_Col md={4} lg={3}>
										<CustomField
											accepter={SelectPicker}
											placeholder="User Role"
											name="role"
											data={rolesData}
											valueKey="name"
											labelKey="name"
											searchable={false}
											value={formData.role}
											onChange={(val) => {
												handleSearch('role', val);
											}}
										/>
									</MWT_Col>
								</MWT_Row>
							</MWT_Col>
							<MWT_Col xxl={5} className="form-wrap">
								<CustomField
									className="f-grow"
									type="text"
									name="search"
									placeholder="Search master"
									value={formData.search}
									onChange={(val) =>
										setFormData({
											...formData,
											search: val,
										})
									}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											handleSearch('search', formData.search);
										}
									}}
								/>
								<Button
									className="rs-btn-main"
									onClick={() => handleSearch('search', formData.search)}
								>
									<i className="ico ico-Search mr-10 color-darkColor" />
									Search
								</Button>
							</MWT_Col>
						</MWT_Row>
					</Form>
				</div>
			)}
		</>
	);
};

export default FilterOfUsers;
