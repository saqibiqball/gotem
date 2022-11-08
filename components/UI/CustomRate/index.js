import React from 'react';
import { Rate } from 'rsuite';

const CustomRate = ({ color, rating, text, ...props }) => {
	return (
		<div className="rate">
			<Rate className={color} defaultValue={rating} {...props} />
			<span className="rate-count">{text}</span>
		</div>
	);
};

export default CustomRate;
