import React from 'react';
import { Form, SelectPicker } from 'rsuite';
import CustomField from '@/components/UI/CustomField';

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

const MissionsSort = ({ formData, handleSearch }) => {
	return (
		<Form>
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
		</Form>
	);
};

export default MissionsSort;
