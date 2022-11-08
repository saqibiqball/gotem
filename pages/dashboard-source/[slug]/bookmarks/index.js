import React from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { userAddToFavorites } from '@/http/userAPI';
import { setFollowsToUser, updateUserAction } from '@/store/user/action';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import BookmarkSourcer from '@/components/Pages/Bookmarks/BookmarkSourcer';
import { AddToFavoritesMission } from '@/http/missionsAPI';
import BookmarkMission from '@/components/Pages/Bookmarks/BookmarkMission';

const Bookmarks = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { isAuth, currentUser } = useSelector((state) => state.user);

	const removeFromFavoritesHandler = async (id) => {
		if (!isAuth) router.push('/login');

		try {
			const bookmarks = await userAddToFavorites(id);
			dispatch(setFollowsToUser(bookmarks));
			CustomNotice({
				content: 'You remove user from bookmarks',
				type: 'success',
			});
		} catch (e) {
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
	};

	const removeMissionFromFavoritesHandler = async (id) => {
		try {
			const missionBookmarks = await AddToFavoritesMission(id);
			dispatch(updateUserAction({ missionBookmarks }));
			CustomNotice({
				content: 'You remove user from bookmarks',
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
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<div className="ls px-32 py-32 bordered">
							<h6>Bookmark</h6>
							<hr />
							<h6 className="h-small my-30 fs-16">Bookmarked missions</h6>
							<MWT_Row className="c-mb-20">
								{currentUser.missionBookmarks?.length === 0 && (
									<MWT_Col>
										<p>You dont have any bookmarks</p>
										<hr />
									</MWT_Col>
								)}
								{currentUser.missionBookmarks?.map((bookmark) => (
									<MWT_Col key={bookmark.id}>
										<BookmarkMission
											mission={bookmark.mission}
											deleteHandler={removeMissionFromFavoritesHandler}
										/>
										<hr />
									</MWT_Col>
								))}
							</MWT_Row>
							<h6 className="h-small my-30 fs-16">Bookmarked sources</h6>
							<MWT_Row className="c-mb-20">
								{currentUser.bookmarks?.length === 0 && (
									<MWT_Col>
										<p>You dont have any bookmarks</p>
									</MWT_Col>
								)}
								{currentUser.bookmarks?.map((bookmark) => (
									<MWT_Col key={bookmark.id}>
										<BookmarkSourcer
											user={bookmark.user}
											deleteHandler={removeFromFavoritesHandler}
										/>
									</MWT_Col>
								))}
							</MWT_Row>
						</div>
					</MWT_Col>
				</MWT_Row>
			</MWT_Container>
		</section>
	);
};
Bookmarks.Layout = DashboardLayout;

export default Bookmarks;
