import {
	DELETE_SKILL,
	FETCH_END,
	FETCH_START,
	LOGOUT_USER,
	SET_FOLLOWS_TO_USER,
	SET_USER,
	UPDATE_USER,
} from '@/store/types';
import { check } from '@/http/userAPI';
import CustomNotice from '@/components/UI/CustomNotice';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const logOutUser = () => ({
	type: LOGOUT_USER,
});

export const updateUserAction = (settings) => ({
	type: UPDATE_USER,
	payload: settings,
});

export const deleteSkillAction = (id) => ({
	type: DELETE_SKILL,
	payload: id,
});

export const startUserFetch = () => ({
	type: FETCH_START,
});

export const endUserFetch = () => ({
	type: FETCH_END,
});

export const setFollowsToUser = (follows) => ({
	type: SET_FOLLOWS_TO_USER,
	payload: follows,
});

export const fetchUserAction = () => async (dispatch) => {
	if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
		dispatch(startUserFetch());
		try {
			const user = await check();
			dispatch(setUser(user));
			return user;
		} catch (e) {
			localStorage.removeItem('token');
			sessionStorage.removeItem('token');
			CustomNotice({
				content: e.response?.data?.message,
				type: 'error',
			});
		}
		dispatch(endUserFetch());
	}
};
