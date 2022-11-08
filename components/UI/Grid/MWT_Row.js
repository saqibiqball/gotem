import React from 'react';

const MWT_Row = ({
	children,
	gutter = '',
	align_items = '',
	justify_content = '',
	className = '',
}) => {
	let classNames = '';
	classNames += gutter && ' c-gutter-' + gutter;
	classNames += align_items && ' align-' + align_items;
	classNames += justify_content && ' justify-content-' + justify_content;
	classNames += className && ' ' + className;

	return <div className={'row' + classNames}>{children}</div>;
};

export default MWT_Row;
