import React from 'react';
import Head from 'next/head';

const DefaultLayout = ({ title = '', children }) => {
	return (
		<>
			<Head>
				<title>Gotem {title.length > 0 ? { title } : ''}</title>
			</Head>
			<main>{children}</main>
		</>
	);
};

export default DefaultLayout;
