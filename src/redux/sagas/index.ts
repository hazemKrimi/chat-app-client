import { all } from 'redux-saga/effects';
import { start } from './chat';

export default function* rootSaga() {
	yield all([start()]);
}
