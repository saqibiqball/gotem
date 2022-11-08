const timeCount = (sec) => {
	const hours = (sec - (sec % 3600)) / 3600;
	const minutes = (sec - (sec - (sec % 3600)) - ((sec - (sec - (sec % 3600))) % 60)) / 60;
	const seconds = (sec - (sec - (sec % 3600))) % 60;
	return { hours, minutes, seconds };
};

export default timeCount;
