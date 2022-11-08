import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { ADMIN_NAVIGATION, SOURCE_NAVIGATION, USER_NAVIGATION } from '@/utils/links';

const HeaderNav = () => {
	const router = useRouter();
	const [activeLink, setActiveLink] = useState('');
	const { currentUser } = useSelector((state) => state.user);

	let links = [];
	switch (currentUser.roleId) {
		case 1:
			links = ADMIN_NAVIGATION(currentUser.slug);
			break;
		case 2:
			links = USER_NAVIGATION(currentUser.slug);
			break;
		case 3:
			links = SOURCE_NAVIGATION(currentUser.slug);
			break;
		default:
			links = [];
	}

	useEffect(() => {
		setActiveLink(router.asPath);
	}, [router]);

	return (
		<ul className="header-nav">
			{links.map((l) => {
				if (l.href === undefined) {
					return (
						<h6 key={l.title} className="sidenav-header fs-16">
							{l.title}
						</h6>
					);
				}
				return (
					<li key={l.href + l.title}>
						<Link href={l.href}>
							<a className={activeLink === l.href ? ' active' : ''}>
								{l.icon}
								<span className="ml-10">{l.title}</span>
							</a>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default HeaderNav;
