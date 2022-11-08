import React from 'react';
import { Tooltip, Whisper } from 'rsuite';

const MarkerComponent = ({ text, status }) => {
	return (
		<Whisper trigger="hover" placement="auto" speaker={<Tooltip>{text}</Tooltip>}>
			<div className={'marker ' + status} />
		</Whisper>
	);
};

export default MarkerComponent;