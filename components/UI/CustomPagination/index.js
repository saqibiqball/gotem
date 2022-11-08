import React from 'react';
import { Pagination } from 'rsuite';

const CustomPagination = ({ limit, total, activePage, setActivePage }) => {
	return (
		<>
			{(total > limit || activePage > 1) && (
				<Pagination
					prev
					next
					size="md"
					maxButtons={3}
					ellipsis
					boundaryLinks
					total={total}
					limit={limit}
					activePage={activePage}
					onChangePage={setActivePage}
				/>
			)}
		</>
	);
};

export default CustomPagination;
