import React, { useState } from 'react';
import Head from 'next/head';
import Copyright from '@/components/Templates/Copyright';
import NavBarPages from '@/components/Templates/NavBarPages';

const PagesLayout = ({ title = '', children }) => {
	const [activeKey, setActiveKey] = useState(null);
	return (
		<>
			<Head>
				<title>Gotem {title.length > 0 ? { title } : ''}</title>
			</Head>
			<NavBarPages activeKey={activeKey} onSelect={(e) => setActiveKey(e)} />
			<main className="dashboard-layout ls ms">
				{children}
			</main>
			<Copyright />
		</>
	);
};

PagesLayout.auth = true;

export default PagesLayout;
