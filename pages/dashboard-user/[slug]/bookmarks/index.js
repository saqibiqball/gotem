import React from 'react';
import DashboardLayout from '@/layouts/dashboard.layout';
import { MWT_Col, MWT_Container, MWT_Row } from '@/components/UI/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { userAddToFavorites } from '@/http/userAPI';
import { setFollowsToUser } from '@/store/user/action';
import CustomNotice from '@/components/UI/CustomNotice';
import { useRouter } from 'next/router';
import BookmarkSourcer from '@/components/Pages/Bookmarks/BookmarkSourcer';

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

	return (
		<section className="s-py-50">
			<MWT_Container>
				<MWT_Row>
					<MWT_Col>
						<div className="ls px-32 py-32 bordered">
							<h6>Bookmark</h6>
							<hr />
							<h6 className="h-small mt-0">Bookmarked sources</h6>
							<MWT_Row>
								{currentUser.bookmarks?.length === 0 && (
									<MWT_Col>
										<p>You dont have bookmarks</p>
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
