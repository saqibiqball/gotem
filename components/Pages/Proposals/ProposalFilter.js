import React from 'react';
import { Form, SelectPicker, TagPicker } from 'rsuite';
import CustomField from '@/components/UI/CustomField';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';

const sortData = [
	{
		name: 'Relevance',
		value: '',
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

const ProposalFilter = ({ formData, handleSearch, properties }) => {
	return (
		<Form>
			<MWT_Row>
				<MWT_Col lg={6}>
					<CustomField
						accepter={SelectPicker}
						placeholder="Sort by:"
						name="sort"
						data={sortData}
						valueKey="value"
						searchable={false}
						labelKey="name"
						value={formData.sort}
						cleanable={false}
						onChange={(val) => {
							handleSearch(val, 'sort');
						}}
					/>
				</MWT_Col>
				<MWT_Col lg={6}>
					<CustomField
						accepter={TagPicker}
						placeholder="All statuses"
						name="categories"
						data={properties.statuses}
						valueKey="id"
						labelKey="name"
						value={formData.statusId}
						cleanable={false}
						onChange={(val) => {
							handleSearch(val, 'statusId');
						}}
					/>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default ProposalFilter;
