import React from 'react';

const MWT_Col = ({
	children,
	xs = '',
	sm = '',
	md = '',
	lg = '',
	xl = '',
	xxl = '',
	className = '',
}) => {
	let classNames = '';
	classNames += xs ? 'col-' + xs : 'col-12';
	classNames += sm && ' col-sm-' + sm;
	classNames += md && ' col-md-' + md;
	classNames += lg && ' col-lg-' + lg;
	classNames += xl && ' col-xl-' + xl;
	classNames += xxl && ' col-xxl-' + xxl;
	classNames += className && ' ' + className;

	return <div className={classNames}>{children}</div>;
};

export default MWT_Col;
