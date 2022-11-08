import React from 'react';
import { Form, SelectPicker } from 'rsuite';
import CustomField from '@/components/UI/CustomField';

const sortData = [
	{
		name: 'Relevance',
		value: '',
	},
	{
		name: 'Rating',
		value: 'raiting',
	},
	{
		name: 'Newest',
		value: 'newest',
	},
	{
		name: 'Oldest',
		value: 'oldest',
	},
];

const SourcesSort = ({ formData, handleSearch }) => {
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
				cleanable={false}
				value={formData.sort}
				onChange={(val) => {
					handleSearch(val);
				}}
			/>
		</Form>
	);
};

export default SourcesSort;
