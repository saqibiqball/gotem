import React from 'react';
import { dateFormat } from '@/helpers/dateFormat';
import CustomLoader from '@/components/UI/CustomLoader';

const UserTransactionTable = ({ transactions, fetching }) => {
	return (
		<div className="table-wrap">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Date</th>
						<th>Milestone title</th>
						<th>Order ID</th>
						<th>Source</th>
						<th>Status</th>
						<th>Currency</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{transactions.length > 0 ? (
						<>
							{transactions.map((item) => (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td style={{ whiteSpace: 'nowrap' }}>
										{dateFormat(item.createdAt)}
									</td>
									<td>{item.milestone?.title}</td>
									<td>{item.orderId}</td>
									<td>{item.userReceived?.nickName}</td>
									<td>{item.status}</td>
									<td>{item.currency}</td>
									<td>
										{item.amount > 0 ? (
											<span>{item.amount}</span>
										) : (
											<span className="refund">{item.amount}</span>
										)}
									</td>
								</tr>
							))}
						</>
					) : (
						<tr>
							<td colSpan="11">
								<p className="text-center">There are no transactions</p>
							</td>
						</tr>
					)}
					{fetching && (
						<tr>
							<td colSpan="11">
								<CustomLoader />
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UserTransactionTable;
