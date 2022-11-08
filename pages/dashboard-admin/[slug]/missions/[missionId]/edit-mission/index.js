import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { useRouter } from 'next/router';
import { Schema } from 'rsuite';
import { getAllPropertiesOfMission, getMission, updateMission } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import MissionForm from '@/components/Pages/Missions/MissionsForm';
import scrollToTop from '@/helpers/scrollToTop';

const { StringType } = Schema.Types;

const model = Schema.Model({
	title: StringType().isRequired('The field is required.'),
	location: StringType().isRequired('The field is required.'),
});

const Index = () => {
	const form = useRef();
	const router = useRouter();
	const { missionId } = router.query;
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
				const mission = await getMission(missionId);

				let missionValue = { ...formValue };
				Object.keys(mission).forEach((key) => {
					if (key === 'deadline') {
						missionValue[key] = new Date(mission[key]);
					} else if (key === 'cats') {
						missionValue.catId = mission.cats.map((cat) => cat.id);
					} else {
						missionValue[key] = mission[key];
					}
				});
				setFormValue((prevState) => ({
					...prevState,
					...missionValue,
					userActivationLink: mission.user.activationLink,
				}));
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
		// eslint-disable-next-line
	}, [missionId]);

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
						data.append('uploaded_missionFiles', item);
					});
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else {
					data.append(key, formValue[key]);
				}
			});
			await updateMission(data);
			CustomNotice({
				content: `You update mission`,
				type: 'success',
			});
			await router.back();
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
						<h6>Edit mission details</h6>
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

Index.Layout = DashboardLayout;

export default Index;
