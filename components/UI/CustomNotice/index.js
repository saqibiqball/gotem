import React from 'react';
import { Message, toaster } from 'rsuite';
import { createMarkup } from '@/helpers/createMarkup';

const CustomNotice = ({ content = '', title = '', type = 'success' }) => {
	return toaster.push(
		<Message type={type} header={title} closable duration={5000}>
			<span dangerouslySetInnerHTML={createMarkup(content)} />
		</Message>,
		{ placement: 'topEnd' }
	);
};

export default CustomNotice;
