import { call, put, takeEvery } from 'redux-saga/effects';
import io, { Socket } from 'socket.io-client';
import { initUser, setUser } from '../slices/user';

function getSocket() {
	return io(`${process.env.REACT_APP_SOCKET_SERVER}`);
}

export function* initUserSaga() {
	const socket: Socket = yield call(getSocket);

	yield put(setUser(socket));
}

export function* watchGetUser() {
	yield takeEvery(initUser.type, initUserSaga);
}
