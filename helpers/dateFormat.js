export function dateFormat(
	date,
	dateOptions = { year: 'numeric', month: 'short', day: 'numeric' }
) {
	return new Date(date).toLocaleString('en-US', dateOptions);
}
