import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './user/reducer';

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
	user,
});

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
		return nextState;
	} else {
		return combinedReducer(state, action);
	}
};

const initStore = () => {
	return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
