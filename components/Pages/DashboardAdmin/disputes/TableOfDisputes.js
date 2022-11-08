import React from 'react';
import { dateFormat } from '@/helpers/dateFormat';
import { Button } from 'rsuite';
import CustomLoader from '@/components/UI/CustomLoader';

const TableOfDisputes = ({ disputes, fetching, openModal }) => {
	return (
		<div className="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Mission title</th>
						<th>User</th>
						<th>Source</th>
						<th>Amount</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{disputes.length > 0 ? (
						<>
							{disputes.map((dispute) => (
								<tr key={dispute.id}>
									<td>{dateFormat(dispute.createdAt)}</td>
									<td>{dispute?.milestone?.proposal?.mission?.title}</td>
									<td>{dispute?.milestone?.proposal?.mission?.user?.email}</td>
									<td>{dispute?.milestone?.proposal?.user?.email}</td>
									<td>{dispute?.milestone?.amount}</td>
									<td>
										<Button
											className="btn-icon"
											onClick={() => openModal(dispute)}
										>
											Mark as resolve
										</Button>
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan="6">
								<p className="text-center">There are no active disputes</p>
							</td>
						</tr>
					)}
					{fetching && (
						<tr>
							<td colSpan="6">
								<CustomLoader />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TableOfDisputes;
