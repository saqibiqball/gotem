import React, { useMemo } from 'react';
import {
	Button,
	DateRangePicker,
	Form,
	InputNumber,
	Radio,
	RadioGroup,
	SelectPicker,
	TagPicker,
} from 'rsuite';
import { MWT_Col, MWT_Row } from '@/components/UI/Grid';
import GoogleInput from '@/components/UI/GoogleInput';
import CustomField from '@/components/UI/CustomField';
import useRequest from '@/hooks/useRequest';
import { getAllPropertiesOfMission } from '@/http/missionsAPI';

const AdminMissionsFilters = ({ formData, setFormData, handleSearch, cleanFilters }) => {
	const [missionProperties, isLoadingProparties] = useRequest(getAllPropertiesOfMission, {});

	const rateDate = useMemo(() => {
		const result = [];
		if (!isLoadingProparties && Object.keys(missionProperties).length > 0) {
			const step = 50;
			const min = Math.floor(missionProperties.rateMin / step);
			const max = Math.ceil(missionProperties.rateMax / step);
			for (let i = min; i <= max; i++) {
				result.push({
					name: i * step,
				});
			}
		}
		return result;
	}, [isLoadingProparties, missionProperties]);

	const onPlaceSelectedHandler = (place) => {
		if (place.name === '') return true;
		const locationObj = {
			locationLat: place.geometry.location.lat(),
			locationLng: place.geometry.location.lng(),
		};
		locationObj.location = place.formatted_address;
		setFormData((prev) => ({ ...prev, ...locationObj }));
	};

	return (
		<Form checkTrigger="change" formValue={formData} onChange={setFormData}>
			{!isLoadingProparties && (
				<MWT_Row className="c-mb-20">
					<MWT_Col>
						<CustomField
							placeholder="Search by title"
							label="Search"
							name="search"
							value={formData.search}
						/>
					</MWT_Col>
					<MWT_Col>
						<GoogleInput
							label="Location"
							placeholder="Location"
							setFormValue={setFormData}
							defaultValue={formData.location}
							onPlaceSelected={onPlaceSelectedHandler}
						/>
					</MWT_Col>
					{formData.location && (
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
							data={missionProperties.missionCategories}
							valueKey="id"
							labelKey="name"
							value={formData.categories}
						/>
					</MWT_Col>
					<MWT_Col>
						<CustomField
							label="Funding type"
							accepter={RadioGroup}
							name="fundingType"
							value={formData.fundingType}
						>
							{missionProperties.missionFundingTypes.map((item) => (
								<Radio key={`funding_${item.id}`} value={item.id}>
									{item.name}
								</Radio>
							))}
						</CustomField>
					</MWT_Col>
					<MWT_Col>
						<CustomField
							label="Mission type"
							accepter={RadioGroup}
							name="missionType"
							value={formData.missionTypeData}
						>
							{missionProperties.missionTypes.map((item) => (
								<Radio key={`mission_type_${item.id}`} value={item.id}>
									{item.name}
								</Radio>
							))}
						</CustomField>
					</MWT_Col>
					<MWT_Col>
						<MWT_Row align_items={'end'} gutter={15}>
							<MWT_Col className="mb-0">
								<label className="rs-form-control-label">Value</label>
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
									value={formData.rateMin}
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
									value={formData.rateMax}
								/>
							</MWT_Col>
						</MWT_Row>
					</MWT_Col>
					<MWT_Col>
						<Button
							block
							className="rs-btn-main2"
							onClick={() => {
								cleanFilters();
								// handleSearch();
							}}
						>
							clean
						</Button>
					</MWT_Col>
					<MWT_Col>
						<Button block className="rs-btn-main" onClick={handleSearch}>
							search
						</Button>
					</MWT_Col>
				</MWT_Row>
			)}
		</Form>
	);
};

export default AdminMissionsFilters;
