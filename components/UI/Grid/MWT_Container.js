import React from 'react';

const MWT_Container = ({ children, fluid, className = '' }) => {
	let classNames = '';
	classNames += fluid ? 'container-fluid' : 'container';
	classNames += className && ' ' + className;

	return <div className={classNames}>{children}</div>;
};

export default MWT_Container;
