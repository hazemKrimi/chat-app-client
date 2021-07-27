import { put, call, take, ActionChannelEffect, fork } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import { Message } from '../types';
import io, { Socket } from 'socket.io-client';
import { setRoom, sendMessage, createRoom, joinRoom, receiveMessage } from '../slices/chat';
import { PayloadAction } from '@reduxjs/toolkit';

function connect() {
	const socket = io(`${process.env.REACT_APP_SOCKET_SERVER}`);
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
}

function* joinedRoomSaga(socket: Socket) {
	const channel: EventChannel<Socket> = yield call(listenForJoiningRoom, socket);
	while (true) {
		let action: ActionChannelEffect = yield take(channel);
		yield put(action);
	}
}

export function listenForJoiningRoom(socket: Socket) {
	return eventChannel(emitter => {
		socket.on('joined-room', (room: string, messages: Array<Message>) => {
			emitter(setRoom({ room, messages }));
		});
		return () => {};
	});
}

export function* createRoomSaga(socket: Socket) {
	try {
		while (true) {
			const action: PayloadAction<{ room: string; socket: Socket }> = yield take(createRoom.type);
			socket.emit('create-room', action.payload);
		}
	} catch (err) {
		console.error(err);
	}
}

export function* joinRoomSaga(socket: Socket) {
	try {
		while (true) {
			const action: PayloadAction<string> = yield take(joinRoom.type);
			socket.emit('join-room', action.payload);
		}
	} catch (err) {
		console.error(err);
	}
}

function* receivedMessageSaga(socket: Socket) {
	const channel: EventChannel<Socket> = yield call(listenForReceivedMessage, socket);
	while (true) {
		let action: ActionChannelEffect = yield take(channel);
		yield put(action);
	}
}

export function listenForReceivedMessage(socket: Socket) {
	return eventChannel(emitter => {
		socket.on('receive-message', (message: Message) => {
			emitter(receiveMessage(message));
		});
		return () => {};
	});
}

export function* sendMessageSaga(socket: Socket) {
	try {
		while (true) {
			const action: PayloadAction<{ room: string; message: Message }> = yield take(
				sendMessage.type
			);

			socket.emit('send-message', action.payload.room, action.payload.message);
		}
	} catch (err) {
		console.error(err);
	}
}

export function* start() {
	const socket: Socket = yield call(connect);

	yield fork(joinedRoomSaga, socket);
	yield fork(receivedMessageSaga, socket);
	yield fork(createRoomSaga, socket);
	yield fork(joinRoomSaga, socket);
	yield fork(sendMessageSaga, socket);
}
