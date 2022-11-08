import React, { useEffect, useState } from 'react';
import SourcePageTabs from '@/components/Pages/Sources/SourcerPage/SourcePageTabs';
import SourcePageEmploymentHistory from '@/components/Pages/Sources/SourcerPage/SourcePageEmploymentHistory';
import { Button, Form } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import CustomField from '@/components/UI/CustomField';
import { updateUser } from '@/http/userAPI';
import { updateUserAction } from '@/store/user/action';
import CustomNotice from '@/components/UI/CustomNotice';

const SourcePageContent = ({
	userBio,
	feedbackCompleted,
	feedbackInProgress,
	employments,
	userId,
}) => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);
	const [bio, setBio] = useState('');
	const [fetching, setFetching] = useState(false);
	const [formValue, setFormValue] = useState({
		bio: '',
	});

	useEffect(() => {
		setBio(userBio);
	}, []);

	const handleSubmit = async () => {
		setFetching(true);
		try {
			const updatedUser = await updateUser(formValue);
			dispatch(updateUserAction(updatedUser));
			setBio(updatedUser.bio);
			setEdit(false);
			CustomNotice({
				content: `Update`,
				type: 'success',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		setFetching(false);
	};

	return (
		<>
			<div className="sourcer-page-content">
				{userBio && userBio.length > 0 && (
					<>
						<div className="sourcer-page-bio">
							<div className="d-flex justify-content-between">
								<h6>About me</h6>
								{currentUser.id === userId && !edit && (
									<Button
										className="btn-icon"
										onClick={() => {
											setEdit(true);
											setFormValue({ ...formValue, bio: bio });
										}}
									>
										<i className="ico ico-Pencil1 fs-18"></i>
									</Button>
								)}
							</div>
							{!edit ? (
								<p>{bio}</p>
							) : (
								<Form
									checkTrigger="change"
									formValue={formValue}
									onChange={setFormValue}
								>
									<CustomField
										name="bio"
										disabled={fetching}
										accepter="textarea"
										rows={5}
									/>
									<Button
										disabled={fetching}
										className="rs-btn-main"
										onClick={handleSubmit}
									>
										save
									</Button>
									<Button
										disabled={fetching}
										className="rs-btn-main2 ml-5"
										onClick={() => setEdit(false)}
									>
										cancel
									</Button>
								</Form>
							)}
						</div>
						<hr />
						<div className="15" />
					</>
				)}

				<div className="sourcer-page-feedbacks">
					<h6>Work history and feedback</h6>
					<div className="divider-20" />
					<SourcePageTabs
						feedbackCompleted={feedbackCompleted}
						feedbackInProgress={feedbackInProgress}
					/>
				</div>
				<div className="divider-30" />
				<div className="sourcer-page-employment-history">
					<SourcePageEmploymentHistory userId={userId} employments={employments} />
				</div>
			</div>
		</>
	);
};

export default SourcePageContent;
