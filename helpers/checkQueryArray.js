import linkToString from '@/helpers/LinkToString';

export const checkQueryArray = (query, key) => {
	return key in query ? [...linkToString(query[key]).split(',')] : [];
};
