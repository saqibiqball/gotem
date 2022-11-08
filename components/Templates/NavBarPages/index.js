import React, { useState } from 'react';
import { Navbar } from 'rsuite';
import Link from 'next/link';
import Image from 'next/image';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';

// eslint-disable-next-line
const NavBarPages = ({ onSelect, activeKey, ...props }) => {
	const [show, setShow] = useState(false);

	const toggleHandler = (bool) => {
		setShow(bool);
	};

	return (
		<header className='page_header for-pages f-grow'>
			<Navbar {...props}>
				<MWT_Container fluid>
					<MWT_Row align_items='center'>
						<MWT_Col className='text-right'>
							<div className='d-flex justify-content-end'>
								<div className='nav-logo  mr-auto'>
									<Link href={'/'}>
										<a className='d-in-flex small-text align-center links-darkColor'>
											<Image
												alt='logo'
												src={
													process.env.NEXT_PUBLIC_CLIENT_URL +
													'/images/logo.svg'
												}
												width={100}
												height={100}
											/>
										</a>
									</Link>
								</div>
							</div>
						</MWT_Col>
					</MWT_Row>
				</MWT_Container>
			</Navbar>
		</header>
	);
};

export default NavBarPages;
