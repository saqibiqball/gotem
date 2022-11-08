import {
	DELETE_SKILL,
	FETCH_END,
	FETCH_START,
	LOGOUT_USER,
	SET_FOLLOWS_TO_USER,
	SET_USER,
	UPDATE_USER,
} from '@/store/types';

const initialState = {
	currentUser: {},
	isAuth: false,
	fetchUser: false,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_START:
			return {
				...state,
				fetchUser: true,
			};
		case FETCH_END:
			return {
				...state,
				fetchUser: false,
			};
		case SET_USER:
			return {
				...state,
				currentUser: action.payload,
				isAuth: true,
			};
		case LOGOUT_USER:
			localStorage.removeItem('token');
			sessionStorage.removeItem('token');
			return {
				...state,
				currentUser: {},
			};
		case UPDATE_USER:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					...action.payload,
				},
			};
		case DELETE_SKILL:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					skills: state.currentUser.skills.filter((skill) => skill.id !== action.payload),
				},
			};
		case SET_FOLLOWS_TO_USER:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					bookmarks: [...action.payload],
				},
			};
		default:
			return state;
	}
}
