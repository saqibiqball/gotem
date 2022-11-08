import React from 'react';
import { DateRangePicker, Form, SelectPicker } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';

const sortData = [
	{
		name: 'Relevance',
		value: '',
	},
	{
		name: 'Highly rated',
		value: 'rated',
	},
	{
		name: 'Newly added',
		value: 'new',
	},
	{
		name: 'Old',
		value: 'old',
	},
	{
		name: 'High price',
		value: 'high_price',
	},
	{
		name: 'Low price',
		value: 'low_price',
	},
];

const AdminMissionsSort = ({ formData, handleSearch }) => {
	return (
		<Form>
			<MWT_Row>
				<MWT_Col md={6}>
					<CustomField
						accepter={SelectPicker}
						placeholder="Sort by:"
						name="sort"
						data={sortData}
						valueKey="value"
						searchable={false}
						labelKey="name"
						value={formData.sort}
						onChange={(val) => {
							handleSearch(val, 'sort');
						}}
					/>
				</MWT_Col>
				<MWT_Col md={6}>
					<CustomField
						className="f-grow"
						isoWeek={true}
						accepter={DateRangePicker}
						placeholder="Create Date Range"
						name="registerRange"
						value={formData.registerRange}
						onChange={(val) => {
							handleSearch(val || [], 'registerRange');
						}}
					/>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default AdminMissionsSort;
