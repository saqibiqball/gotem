import React, { useEffect, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import { useRouter } from 'next/router';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import MissionPageSideBarPrivate from '@/components/Pages/Missions/MissionPage/MissionPageSideBarPrivate';
import MissionPageSideBarCrowdfund from '@/components/Pages/Missions/MissionPage/MissionPageSideBarCrowdfund';
import ProposalForm from '@/components/Pages/Proposals/ProposalForm';
import CustomNotice from '@/components/UI/CustomNotice';
import { getProposal, updateProposal } from '@/http/proposalsAPI';
import DashboardLayout from '@/layouts/dashboard.layout';
import createFixedMilestones from '@/helpers/createFixedMilestones';
import scrollToTop from '@/helpers/scrollToTop';

const { StringType } = Schema.Types;

const model = Schema.Model({
	description: StringType().isRequired('The field is required.'),
});

const EditProposal = () => {
	const router = useRouter();
	const form = useRef();
	const [formError, setFormError] = useState({});
	const { proposalId } = router.query;
	const [proposal, setProposal] = useState({});
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
				if (proposalId) {
					const data = await getProposal(+proposalId);
					setProposal(data);
					setFormValue({
						description: data.description,
						isFixedPrice: data.isFixedPrice === true ? 1 : 0,
						amount: data.amount,
						retainerAmount: data.retainerAmount,
					});
					setMilestones(data.milestones);
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
	}, [proposalId]);

	useEffect(() => {
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
				if (key !== 'createdAt') {
					objToSubmit[key] = formValue[key];
				}
			});
			if (formValue.isFixedPrice === 1) {
				objToSubmit.milestones = createFixedMilestones(formValue, proposal.mission.title);
			} else {
				objToSubmit.milestones = milestones;
			}
			objToSubmit.id = proposal.id;
			await updateProposal(objToSubmit);
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
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col lg={8} className="offset-lg-2">
						<h6>Edit the proposal</h6>
						<div className="divider-30" />
					</MWT_Col>
					{!fetch && Object.keys(proposal).length > 0 ? (
						<MWT_Col lg={8} className="offset-lg-2">
							<div className="ls p-32 bordered">
								<h6 className="mt-0 fs-20">{proposal.mission.title}</h6>
								<div className="divider-30"></div>
								<h6 className="fs-16 mt-0">Mission Description</h6>
								<p>{proposal.mission.description}</p>
								<h6 className="fs-16 mt-0">Mission Objectives</h6>
								<p className="text-with-br">{proposal.mission.objectives}</p>
								<hr />
								{proposal.mission.missionTypeId === 1 && (
									<MissionPageSideBarPrivate
										mission={proposal.mission}
										addToFavorite={false}
									/>
								)}
								{proposal.mission.missionTypeId === 2 && (
									<MissionPageSideBarCrowdfund mission={proposal.mission} />
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
					) : (
						<MWT_Col lg={8} className="offset-lg-2">
							<p>Proposal not found</p>
						</MWT_Col>
					)}
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

EditProposal.Layout = DashboardLayout;

export default EditProposal;
