export const urlStepsBack = (url, steps) => {
	let path = url.split('?')[0];
	return path.split('/').slice(0, -steps).join('/');
};
