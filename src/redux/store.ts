import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as chatReducer } from './slices/chat';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: combineReducers({
		chat: chatReducer
	}),
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: false,
			serializableCheck: {
				ignoredActions: ['user/setUser', 'chat/createRoom'],
				ignoredPaths: ['user.socket']
			}
		}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
