import React from 'react';
import { Pagination } from 'rsuite';
import { useRouter } from 'next/router';

const Index = ({ limit, total, activePage, url = '/' }) => {
	const router = useRouter();

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
					total={total > limit ? total : activePage}
					limit={limit}
					activePage={activePage}
					onChangePage={(val) => {
						if (val !== 1) {
							router.replace({ query: { ...router.query, page: val } }, undefined, {
								shallow: true,
							});
						} else {
							let cleanUrl = { ...router.query };
							delete cleanUrl.page;
							router.replace({ query: { ...cleanUrl } }, undefined, {
								shallow: true,
							});
						}
					}}
				/>
			)}
		</>
	);
};

export default Index;
