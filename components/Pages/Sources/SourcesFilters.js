import React, { useMemo } from 'react';
import { Button, Form, InputNumber, Rate, SelectPicker, TagPicker } from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import GoogleInput from '@/components/UI/GoogleInput';
import CustomField from '@/components/UI/CustomField';
import useRequest from '@/hooks/useRequest';
import { getAllPropertiesOfUsers } from '@/http/userAPI';

const categoriesData = [
	{ id: '1', name: 'Category 1' },
	{ id: '2', name: 'Category 2' },
	{ id: '3', name: 'Category 3' },
];

const sourceTypeData = [
	{ id: '1', name: 'Type 1' },
	{ id: '2', name: 'Type 2' },
	{ id: '3', name: 'Type 3' },
];

const SourcesFilters = ({ formData, setFormData, handleSearch }) => {
	const [properties, isLoadingProperties] = useRequest(getAllPropertiesOfUsers, {});

	const rateDate = useMemo(() => {
		const result = [];
		if (!isLoadingProperties && Object.keys(properties).length > 0) {
			const step = 5;
			const min = Math.floor(properties.rateMin / step);
			const max = Math.ceil(properties.rateMax / step);
			for (let i = min; i <= max; i++) {
				result.push({
					name: i * step,
				});
			}
		}
		return result;
	}, [isLoadingProperties, properties]);

	const onPlaceSelectedHandler = (place) => {
		if (place.name === '') return true;
		const locationObj = {
			locationLat: place.geometry.location.lat(),
			locationLng: place.geometry.location.lng(),
		};
		place.address_components.forEach((address) => {
			const neededObjForCountry =
				address.types.includes('country') && address.types.includes('political');
			if (neededObjForCountry) {
				locationObj.country = address.long_name;
			}
		});
		setFormData((prev) => ({ ...prev, ...locationObj, location: place.formatted_address }));
	};

	return (
		<Form
			className="col-h-100"
			checkTrigger="change"
			formValue={formData}
			onChange={setFormData}
		>
			<MWT_Row className="c-mb-20">
				<MWT_Col>
					<GoogleInput
						label="Location"
						placeholder="Location"
						setFormValue={setFormData}
						defaultValue={formData.location}
						onPlaceSelected={onPlaceSelectedHandler}
					/>
				</MWT_Col>
				{formData.country && (
					<MWT_Col>
						<CustomField
							label="Radius Search, km"
							placeholder="Radius Search"
							min={0}
							accepter={InputNumber}
							name="radius"
							value={formData.radius}
						/>
					</MWT_Col>
				)}
				<MWT_Col>
					<CustomField
						accepter={TagPicker}
						label="Categories"
						placeholder="All categories"
						name="categories"
						data={properties.categories}
						valueKey="id"
						labelKey="name"
						value={formData.categories}
					/>
				</MWT_Col>
				<MWT_Col>
					<div className="rs-form-group">
						<CustomField
							accepter={Rate}
							label="Rating"
							name="rating"
							size={'xs'}
							value={+formData.rating}
						/>
					</div>
				</MWT_Col>
				<MWT_Col>
					<CustomField
						accepter={SelectPicker}
						label="Source Type"
						placeholder="All source types"
						name="sourceType"
						data={sourceTypeData}
						valueKey="id"
						labelKey="name"
						value={formData.sourceType}
					/>
				</MWT_Col>
				<MWT_Col>
					<MWT_Row align_items={'end'} gutter={15}>
						<MWT_Col className="mb-0">
							<label className="rs-form-control-label">Hourly rate</label>
						</MWT_Col>
						<MWT_Col xxl={6} xl={12} sm={6}>
							<CustomField
								accepter={SelectPicker}
								placeholder="Min"
								name="rateMin"
								data={rateDate}
								valueKey="name"
								labelKey="name"
								searchable={false}
								value={+formData.rateMin}
							/>
						</MWT_Col>
						<MWT_Col xxl={6} xl={12} sm={6}>
							<CustomField
								accepter={SelectPicker}
								placeholder="Max"
								name="rateMax"
								data={rateDate}
								valueKey="name"
								labelKey="name"
								searchable={false}
								value={+formData.rateMax}
							/>
						</MWT_Col>
					</MWT_Row>
				</MWT_Col>
				<MWT_Col>
					<Button block className="rs-btn-main" onClick={handleSearch}>
						search
					</Button>
				</MWT_Col>
			</MWT_Row>
		</Form>
	);
};

export default SourcesFilters;
