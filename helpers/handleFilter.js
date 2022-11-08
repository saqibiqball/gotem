export const handleFilter = (val = '', key = '', filtersData = {}, router) => {
	let queryObj = { ...router.query, page: 1 };
	let queryData = {};

	Object.keys(filtersData).forEach((key) => {
		if (Array.isArray(filtersData[key])) {
			queryData[key] = filtersData[key].join(',').trim();
		} else if (typeof filtersData[key] === 'boolean') {
			queryData[key] = filtersData[key] ? 1 : 0;
		} else {
			queryData[key] = filtersData[key];
		}
	});

	if (val) {
		if (Array.isArray(val)) {
			queryData[key] = val.join(',').trim();
		} else {
			queryData[key] = val;
		}
	} else {
		delete queryObj[key];
	}

	Object.keys(queryData).forEach((key) => {
		if (
			(!queryData[key]?.length || queryData[key] === null) &&
			typeof queryData[key] !== 'number'
		) {
			delete queryData[key];
			delete queryObj[key];
		}
	});

	const QUERY = { ...queryObj, ...queryData };
	router.replace({ query: QUERY }, undefined, {
		shallow: true,
	});
};
