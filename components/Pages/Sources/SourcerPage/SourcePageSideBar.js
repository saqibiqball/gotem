import React, { useMemo, useState } from 'react';
import { Button, Progress } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CustomNotice from '@/components/UI/CustomNotice';
import { userAddToFavorites } from '@/http/userAPI';
import { setFollowsToUser } from '@/store/user/action';
import SendMessageModal from '@/components/Modals/SendMessageModal';

const SourcePageSideBar = ({ user, handleReport }) => {
	const { isAuth, currentUser } = useSelector((state) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const [modalMessageShow, setModalMessageShow] = useState(false);

	const handlerModalMessageShow = () => {
		setModalMessageShow(true);
	};

	const handlerModalMessageClose = () => {
		setModalMessageShow(false);
	};

	const checkISFollow = useMemo(() => {
		return currentUser.bookmarks?.some((el) => +el.userBookmarkId === +user.id);
	}, [currentUser, user]);

	const addToFavoritesHandler = async (id) => {
		if (!isAuth) router.push('/login');

		try {
			const bookmarks = await userAddToFavorites(id);
			dispatch(setFollowsToUser(bookmarks));
			CustomNotice({
				content: checkISFollow
					? `You remove user from bookmarks`
					: `You add user to bookmarks`,
				type: 'success',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	return (
		<>
			<SendMessageModal
				modalShow={modalMessageShow}
				handlerModalClose={handlerModalMessageClose}
				user={user}
			/>
			<div className="source-page-side-bar">
				<div className="hourly-rate">
					<div className="hourly-rate-wrap">
						<h6>${user.hourlyRate}</h6>
						<span>Hourly Rate</span>
					</div>
					<div className="hourly-rate-wrap">
						<h6>53</h6>
						<span>Jobs Done</span>
					</div>
					<div className="hourly-rate-wrap">
						<h6>22</h6>
						<span>Rehired</span>
					</div>
				</div>
				<div className="divider-30" />
				{isAuth && currentUser.id !== +user.id && (
					<>
						<Button
							block
							className="rs-btn-main"
							onClick={() => handlerModalMessageShow()}
						>
							Direct Message
						</Button>
						<Button
							block
							className="rs-btn-main"
							onClick={() => addToFavoritesHandler(user.id)}
						>
							{!checkISFollow ? 'Add to favorite' : 'Remove from favorite'}
						</Button>
						<Button block className="rs-btn-main" onClick={() => handleReport()}>
							report user
						</Button>
					</>
				)}
				<div className="divider-30" />
				<div className="progress-bar">
					<Progress.Line percent={30} strokeWidth={5} showInfo strokeColor="#E46B2D" />
					<p>Job Success</p>
				</div>
				<div className="progress-bar">
					<Progress.Line percent={15} strokeWidth={5} showInfo strokeColor="#8D99FF" />
					<p>On Budget</p>
				</div>
				{user.skills.length > 0 && (
					<>
						<div className="divider-30" />
						<div className="skills">
							<h6>Skills</h6>
							<ul>
								{user.skills.map((skill) => (
									<li key={skill.id}>{skill.name}</li>
								))}
							</ul>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default SourcePageSideBar;
