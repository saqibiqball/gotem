import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TableOfMissions = ({ missions, setMissions, fetch }) => {
	const form = useRef();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const handleEdit = (data) => {
		router.push(`/dashboard-admin/${currentUser.slug}/missions/edit-missions/${data.id}`);
	};

	return (
		<>
			<div className="t-header">
				<span>Missions</span>
			</div>
			<div className="table-wrap">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Created</th>
							<th>Location</th>
							<th>Categories</th>
							<th>Funding type</th>
							<th>Mission type</th>
							<th>Author</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
				</table>
			</div>
		</>
	);
};

export default TableOfMissions;
