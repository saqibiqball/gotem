import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Nav, Sidenav } from 'rsuite';
import Link from 'next/link';
import { SOURCE_NAVIGATION, USER_NAVIGATION, ADMIN_NAVIGATION } from '@/utils/links';
import Copyright from '@/components/Templates/Copyright';

const SideBar = () => {
	const router = useRouter();
	const [activeLink, setActiveLink] = useState('');
	const [expanded, setExpanded] = useState(true);
	const [slug, setSlug] = useState('')
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
			if (currentUser.statusId !== 1) {
				links = SOURCE_NAVIGATION(currentUser.slug).filter((link) => {
					link.default; 
				}) ; 	
			} else {
				links = SOURCE_NAVIGATION(currentUser.slug);
				
			}
		
			break;
		default:
			links = [];
	}

	useEffect(() => {
		setActiveLink(router.asPath);
	}, [router]);

	const toggleExpanded = (bool) => {
		setExpanded(bool);
	};

	return (
		<Sidenav className="page_sidenav hidden-below-md " expanded={expanded}>
			<Sidenav.Header>
				<Link href={'/'}>
					<a className="d-in-flex small-text align-center links-darkColor">
						{expanded ? (
							<Image
								alt="logo"
								src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo.svg'}
								width={130}
								height={60}
								quality={100}
							/>
						) : (
							<Image
								alt="logo"
								src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo-icon.svg'}
								width={32}
								height={32}
							/>
						)}
					</a>
				</Link>
				<Button
					className="toggle-btn-header rs-btn-link p-0"
					onClick={() => toggleExpanded(!expanded)}
				>
					{expanded ? (
						<i className="fs-16 ico ico-X" />
					) : (
						<i className="fs-16 ico ico-Menu-alt-8" />
					)}
				</Button>
			</Sidenav.Header>
			<Sidenav.Body>
				<Nav>
					{links.map((l) => {
						if (l.href === undefined) {
							return (
								<h6 key={l.title} className="sidenav-header fs-16">
									{l.title}
								</h6>
							);
						}
						return (
							<Link key={l.href} href={l.href}>
								<a
									className={
										'rs-sidenav-item ' +
										(activeLink === l.href ? ' rs-sidenav-item-active' : '')
									}
								>
									{l.icon}
									<span>{l.title}</span>
								</a>
							</Link>
						);
					})}
				</Nav>
			</Sidenav.Body>
			<Copyright />
		</Sidenav>
	);
};

export default SideBar;
