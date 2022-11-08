const linkToString = (string) => {
	// string = string[0].toUpperCase() + string.slice(1);
	if (Array.isArray(string)) {
		return string[0].normalize('NFD').replace(/[+]/g, ' ').replace(/_/g, ' ');
	}
	return string.normalize('NFD').replace(/[+]/g, ' ').replace(/_/g, ' ');
};
export default linkToString;
