import React from 'react';
import { Breadcrumb } from 'rsuite';
import Link from 'next/link';
import MWT_Container from '@/components/UI/Grid/MWT_Container';
import MWT_Row from '@/components/UI/Grid/MWT_Row';
import MWT_Col from '@/components/UI/Grid/MWT_Col';

const MyBreadcrumb = ({ separator, pathname, className }) => {
	const query = pathname.indexOf('?');
	const pathnameArr =
		query < 0 ? pathname.slice(1).split('/') : pathname.slice(1, query).split('/');

	return (
		<section className="ds s-py-80 s-py-xl-120 bg-title">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<div className="divider-xl-130" />
						<Breadcrumb className={className} separator={separator}>
							<Breadcrumb.Item as={Link} href="/">
								Miss Travel
							</Breadcrumb.Item>
							{pathnameArr.length > 0 &&
								pathnameArr.map((link, index) => {
									const trueLink = link.replace('-', ' ');
									if (!trueLink.length) return;
									return (
										<Breadcrumb.Item
											key={link}
											as={Link}
											href={'/' + pathnameArr.slice(0, index + 1).join('/')}
											active={pathnameArr.length - 1 === index}
										>
											{trueLink}
										</Breadcrumb.Item>
									);
								})}
						</Breadcrumb>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

export default MyBreadcrumb;
