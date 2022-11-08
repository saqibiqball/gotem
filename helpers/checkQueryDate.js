export const checkQueryDate = (query, key) => {
	return key in query ? query[key].split(',').map((t) => new Date(t)) : [];
};
