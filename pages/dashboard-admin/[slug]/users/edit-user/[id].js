import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { Schema } from 'rsuite';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { getRoles, getStatuses, getUser, updateUser } from '@/http/userAPI';
import CustomNotice from '@/components/UI/CustomNotice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import MainSettingsForm from '@/components/Pages/ProfileSettings/ProfileSettingsForms/MainSettingsForm';
import useRequest from '@/hooks/useRequest';
import scrollToTop from '@/helpers/scrollToTop';

const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
	firstName: StringType().isRequired('The field is required.'),
	lastName: StringType().isRequired('The field is required.'),
	nickName: StringType().isRequired('The field is required.'),
	email: StringType().isEmail('test@test.com').isRequired('The field is required.'),
	location: StringType().isRequired('The field is required.'),
});

const Index = ({ id }) => {
	const form = useRef();
	const router = useRouter();
	const { currentUser } = useSelector((state) => state.user);
	const [roles, loadingRoles] = useRequest(getRoles);
	const [statuses, loadingStatuses] = useRequest(getStatuses);
	const [formError, setFormError] = useState({});
	const [fetching, setFetching] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');

	const [formValue, setFormValue] = useState({
		id,
		photo: [],
		nickName: '',
		password: '',
		firstName: '',
		lastName: '',
		email: '',
		statusId: null,
		locationLat: 0,
		locationLng: 0,
		location: '',
		country: '',
		countryShortName: '',
		imagesToDelete: [],
		files: [],
		selfyFiles: [],
		bio: '',
		alternativeEmail: '',
		jobTitle: '',
		showJobTitle: false,
		user_skills: [],
		deletedSkills: [],
	});
	const isLoading = !loadingStatuses && !loadingRoles;
	const [skills, setSkills] = useState([]);
	useEffect(() => {
		const fetchUser = async () => {
			setFetching(true);
			try {
				const user = await getUser(id);
				setFormValue((prevState) => ({
					...prevState,
					photo: user.photo,
					nickName: user.nickName,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					location: user.location,
					country: user.country,
					countryShortName: user.countryShortName,
					city: user.city,
					locationLat: user.locationLat,
					locationLng: user.locationLng,
					bio: user.bio,
					jobTitle: user.jobTitle,
					showJobTitle: user.showJobTitle,
					alternativeEmail: user.alternativeEmail,
					user_skills: user.skills,
					roleId: user.roleId,
					statusId: user.statusId,
				}));
			} catch (e) {
				CustomNotice({
					content: e.response?.data?.message,
					type: 'error',
				});
			}
			setFetching(false);
		};

		fetchUser();
	}, [id]);

	const handleSubmit = async () => {
		if (!form.current.check()) {
			scrollToTop();
			return true;
		}
		setFetching(true);
		try {
			const data = new FormData();
			Object.keys(formValue).forEach((key) => {
				if (key === 'password') {
					formValue[key].length > 0 && data.append(key, formValue[key]);
				} else if (key === 'toDelete') {
					data.append(key, JSON.stringify(formValue[key]));
				} else if (key === 'uploaded_photo') {
					formValue[key].forEach((item) => {
						data.append('uploaded_photo', item.file);
					});
				} else {
					data.append(key, formValue[key]);
				}
			});
			data.append('skills', JSON.stringify(skills));
			await updateUser(data);
			CustomNotice({
				content: `User ${formValue.firstName} ${formValue.lastName} was updated`,
			});
			await router.replace(`/dashboard-admin/${currentUser.slug}/users`);
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<section className="ls ms s-py-90 s-py-xl-120 h-100">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col xxl={8} className="ml-auto mr-auto">
						<Image
							alt="logo"
							src={process.env.NEXT_PUBLIC_CLIENT_URL + '/images/logo.svg'}
							width={116}
							height={40}
						/>
						<div className="divider-30" />
						<h6 className="special-heading">
							<span>Update user</span>
						</h6>
						<div className="divider-40" />
						<div className="p-30 p-xxl-65 ls shadow rounded">
							{successMsg.length > 0 ? (
								<h5 className="text-center">{successMsg}</h5>
							) : (
								<MainSettingsForm
									formError={formError}
									form={form}
									model={model}
									setSkills={setSkills}
									skills={skills}
									formValue={formValue}
									setFormValue={setFormValue}
									setFormError={setFormError}
									fetching={fetching}
									handleSubmit={handleSubmit}
									roleId={currentUser.roleId}
									roles={roles}
									statuses={statuses}
								/>
							)}
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};

Index.Layout = DashboardLayout;

export async function getServerSideProps({ params }) {
	return {
		props: {
			id: params.id,
		},
	};
}

export default Index;
