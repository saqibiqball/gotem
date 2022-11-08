import React, { useEffect, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import MissionForm from '@/components/Pages/Missions/MissionsForm';
import CustomNotice from '@/components/UI/CustomNotice';
import { addMission, getAllPropertiesOfMission } from '@/http/missionsAPI';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import scrollToTop from '@/helpers/scrollToTop';

const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
	title: StringType().isRequired('The field is required.'),
	location: StringType().isRequired('The field is required.'),
	// type: StringType().isRequired('The field is required.'),
	// missionCategoriesId: StringType().isRequired('The field is required.'),
	// estimatedBudget: NumberType().isRequired('The field is required.'),
	// deadline: StringType().isRequired('The field is required.'),
	// isPrivacy: StringType().isRequired('The field is required.'),
	// description: StringType().isRequired('The field is required.'),
	// objectives: StringType().isRequired('The field is required.'),
});

const AddMission = () => {
	const form = useRef();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [formError, setFormError] = useState({});
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		title: '',
		missionFundingTypeId: null,
		catId: [],
		location: '',
		estimatedBudget: 0,
		deadline: null,
		missionTypeId: null,
		isRemote: false,
		isUrgent: false,
		description: '',
		objectives: '',
		missionFiles: [],
	});
	const [allProperties, setAllProperties] = useState({});

	useEffect(() => {
		const fetchAllProperties = async () => {
			setFetching(true);
			try {
				const propertiesData = await getAllPropertiesOfMission();
				setAllProperties(propertiesData);
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetching(false);
		};
		fetchAllProperties();
		setFormValue({ ...formValue, userActivationLink: currentUser.activationLink });
	}, []);

	const handleSubmit = async () => {
		if (!form.current.check()) {
			scrollToTop();
			return true;
		}
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				if (key === 'uploaded_missionFiles') {
					formValue[key].forEach((item) => {
						data.append(key, item);
					});
				} else {
					data.append(key, formValue[key]);
				}
			});
			await addMission(data);
			CustomNotice({
				content: `You add new mission`,
				type: 'success',
			});
			router.push(`/dashboard-user/${currentUser.slug}/my-missions`);
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<h6>Upload mission details</h6>
						<div className="divider-30" />
					</MWT_Col>
					<MWT_Col>
						<div className="ls px-32 py-32 bordered">
							<MissionForm
								model={model}
								properties={allProperties}
								form={form}
								setFormError={setFormError}
								formError={formError}
								formValue={formValue}
								setFormValue={setFormValue}
								fetching={fetching}
								handleSubmit={handleSubmit}
							/>
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};
AddMission.Layout = DashboardLayout;
export default AddMission;
