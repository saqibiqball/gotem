import React, { useEffect, useMemo, useState } from 'react';

const More = ({ elem, text = '', number, color = 'color-darkColor' }) => {
	const [isMoreShow, setIsMoreShow] = useState(false);
	const [isMore, setIsMore] = useState(false);

	useEffect(() => {
		if (elem && text && text.length > number) {
			setIsMoreShow(true);
			setIsMore(true);
		}
	}, [elem, text, number]);

	const TEXT = useMemo(() => {
		if (elem) {
			if (isMore) {
				return text.slice(0, number) + '...';
			}
			return text;
		}
	}, [elem, isMore, number, text]);

	return (
		<div>
			<div className={'text-with-br fs-16 mb-10 ' + color}>{TEXT}</div>

			{isMoreShow && (
				<span
					onClick={() => setIsMore(!isMore)}
					className="cursor-pointer links-colorMain2"
				>
					{isMore ? 'More' : 'Less'}
				</span>
			)}
		</div>
	);
};

export default More;
