import React, { forwardRef } from 'react';
import Link from 'next/link';

const MyLink = forwardRef((props, ref) => {
	const { href, as, ...rest } = props;
	return (
		<Link href={href} as={as}>
			<a ref={ref} {...rest} />
		</Link>
	);
});

MyLink.displayName = 'MyLink';

export default MyLink;
