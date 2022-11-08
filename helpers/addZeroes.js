export const addZeroes = (num) => {
	return Number(num).toFixed(Math.max(num.toString().split('.')[1]?.length, 2) || 2);
};
