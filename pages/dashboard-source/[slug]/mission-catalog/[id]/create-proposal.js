import React, { useEffect, useMemo, useRef, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { getMissionInfo } from '@/http/missionsAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { Schema } from 'rsuite';
import ProposalForm from '@/components/Pages/Proposals/ProposalForm';
import { addProposal } from '@/http/proposalsAPI';
import MissionPageSideBarPrivate from '@/components/Pages/Missions/MissionPage/MissionPageSideBarPrivate';
import MissionPageSideBarCrowdfund from '@/components/Pages/Missions/MissionPage/MissionPageSideBarCrowdfund';
import createFixedMilestones from '@/helpers/createFixedMilestones';
import scrollToTop from '@/helpers/scrollToTop';

const { StringType } = Schema.Types;

const model = Schema.Model({
	description: StringType().isRequired('The field is required.'),
});

const CreateProposal = () => {
	const router = useRouter();
	const form = useRef();
	const [formError, setFormError] = useState({});
	const { id } = router.query;
	const [mission, setMission] = useState({});
	const [fetch, setFetch] = useState(false);
	const [milestones, setMilestones] = useState([]);
	const [formValue, setFormValue] = useState({
		description: '',
		isFixedPrice: 1,
		amount: null,
		retainerAmount: null,
	});

	useEffect(() => {
		const fetchMission = async () => {
			setFetch(true);
			try {
				if (id) {
					const missionData = await getMissionInfo(id);
					setMission(missionData);
				}
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetch(false);
		};
		fetchMission();
	}, [id]);

	useMemo(() => {
		if (milestones.length > 0) {
			const sum = milestones.reduce((accumulator, object) => {
				return accumulator + +object.amount;
			}, 0);
			setFormValue({ ...formValue, amount: sum, retainerAmount: +milestones[0].amount });
		}
		// eslint-disable-next-line
	}, [milestones]);

	const handleSubmit = async () => {
		if (!form.current.check()) {
			scrollToTop();
			return true;
		}

		if (formValue.isFixedPrice === 1) {
			if (formValue.amount === null) {
				setFormError({ ...formError, amount: 'The field is required.' });
				return true;
			} else if (formValue.retainerAmount === null || formValue.retainerAmount.length < 0) {
				setFormError({ ...formError, retainerAmount: 'The field is required.' });
				return true;
			}
		} else {
			if (milestones.length < 1) {
				setFormError({ ...formError, isFixedPrice: 'Milestones length must be more 1' });
				return true;
			}
		}
		setFetch(true);
		try {
			let objToSubmit = {};
			Object.keys(formValue).forEach((key) => {
				objToSubmit[key] = formValue[key];
			});
			if (formValue.isFixedPrice === 1) {
				objToSubmit.milestones = createFixedMilestones(formValue, mission.title);
			} else {
				objToSubmit.milestones = milestones;
			}

			objToSubmit.missionId = id;
			await addProposal(objToSubmit);
			router.back();
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetch(false);
	};

	return (
		<>
			<section className="s-py-50">
				<MWT_Container>
					<MWT_Row>
						<MWT_Col lg={8} className="offset-lg-2">
							<h6>Apply the mission</h6>
							<div className="divider-30" />
						</MWT_Col>
						<MWT_Col lg={8} className="offset-lg-2">
							<div className="ls p-32 bordered">
								<h6 className="mt-0 fs-20">{mission.title}</h6>
								<div className="divider-30"></div>
								<h6 className="fs-16 mt-0">Mission Description</h6>
								<p>{mission.description}</p>
								<h6 className="fs-16 mt-0">Mission Objectives</h6>
								<p className="text-with-br">{mission.objectives}</p>
								<hr />
								{mission.missionTypeId === 1 && (
									<MissionPageSideBarPrivate
										mission={mission}
										addToFavorite={false}
									/>
								)}
								{mission.missionTypeId === 2 && (
									<MissionPageSideBarCrowdfund mission={mission} />
								)}
								<hr />
								<ProposalForm
									model={model}
									form={form}
									setFormError={setFormError}
									formError={formError}
									formValue={formValue}
									setFormValue={setFormValue}
									fetching={fetch}
									handleSubmit={handleSubmit}
									milestones={milestones}
									setMilestones={setMilestones}
								/>
							</div>
						</MWT_Col>
					</MWT_Row>
				</MWT_Container>
			</section>
		</>
	);
};

CreateProposal.Layout = DashboardLayout;

export default CreateProposal;
