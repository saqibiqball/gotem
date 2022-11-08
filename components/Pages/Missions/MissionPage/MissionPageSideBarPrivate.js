import React, { useMemo } from 'react';
import { Button, Tag, TagGroup } from 'rsuite';
import dateHelpers from '@/helpers/dateHelpers';
import { AddToFavoritesMission } from '@/http/missionsAPI';
import { updateUserAction } from '@/store/user/action';
import CustomNotice from '@/components/UI/CustomNotice';
import { useDispatch, useSelector } from 'react-redux';

const MissionPageSideBarPrivate = ({ mission, addToFavorite }) => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);

	const deadlineFormatDate = useMemo(() => {
		const { day, month, year } = dateHelpers.formatDate(new Date(mission.deadline));
		return `${day}.${month}.${year}`;
	}, [mission.deadline]);

	const checkISFollow = useMemo(() => {
		return currentUser.missionBookmarks?.some((el) => +el.missionId === +mission.id);
	}, [currentUser, mission]);

	const addToFavoritesHandler = async () => {
		try {
			const missionBookmarks = await AddToFavoritesMission(mission.id);
			dispatch(updateUserAction({ missionBookmarks }));
			CustomNotice({
				content: checkISFollow
					? `You remove mission from bookmarks`
					: `You add mission to bookmarks`,
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
		<div>
			<ul className="list-unstyled">
				<li>
					<i className="ico ico-Location-marker mr-10" />
					<span>
						Location: {mission.city}
						{mission.administartiveArea.length > 0
							? ', ' + mission.administartiveArea
							: ''}
					</span>
				</li>
				<li>
					<i className="ico ico-Calendar mr-10" />
					<span>Deadline: {deadlineFormatDate}</span>
				</li>
				<li>
					<i className="ico ico-Currency-Dollar1 mr-10" />
					<span>Budget: $ {mission.estimatedBudget}</span>
				</li>
			</ul>
			<h6 className="h-small mt-10">Mission Categories</h6>
			{mission.cats && mission.cats.length > 0 && (
				<>
					<div className="mt-20" />
					<TagGroup>
						{mission.cats.map((cat) => (
							<Tag key={'cat_' + cat.id}>{cat.name}</Tag>
						))}
					</TagGroup>
				</>
			)}
			{addToFavorite && (
				<Button className="rs-btn-main mt-30" onClick={addToFavoritesHandler}>
					{!checkISFollow ? 'Add to favorite' : 'Remove from favorite'}
				</Button>
			)}
		</div>
	);
};

export default MissionPageSideBarPrivate;
