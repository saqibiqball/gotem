import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CustomLoader from '@/components/UI/CustomLoader';
import NavBar from '@/components/Templates/NavBar';
import SideBar from '@/components/Templates/SideBar';
import Copyright from '@/components/Templates/Copyright';
import checkUser from '@/helpers/checkUser';

const DashboardLayout = ({ title = '', children }) => {
	const router = useRouter();
	const user = useSelector((state) => state.user);
	const [activeKey, setActiveKey] = useState(null);

	useEffect(() => {
		checkUser(user, router);
		// eslint-disable-next-line
	}, [user.isAuth]);

	return (
		<>
			<Head>
				<title>Gotem {title.length > 0 ? { title } : ''}</title>
			</Head>
			<div className="d-flex">
				<SideBar />
				<div className="f-grow" style={{ width: 'calc(100% - 290px)' }}>
					<NavBar activeKey={activeKey} onSelect={(e) => setActiveKey(e)} />
					<main className="dashboard-layout ls ms">
						{!user.isAuth ? <CustomLoader /> : <>{children}</>}
					</main>
				</div>
			</div>
			<div className="hidden-above-md text-center">
				<Copyright />
			</div>
		</>
	);
};

DashboardLayout.auth = true;

export default DashboardLayout;
