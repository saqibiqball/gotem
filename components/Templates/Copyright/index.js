import React from 'react';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';

const Copyright = () => {
	return (
		<section className="ls s-py-20 page_copyright">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<p className="fs-12">© Copyright 2022 Gotem</p>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

export default Copyright;
