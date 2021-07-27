import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, Chat } from '../types';

const initialState: Chat = {
	messages: [],
	room: ''
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		createRoom: (state, action: PayloadAction<string>) => {},
		joinRoom: (state, action: PayloadAction<string>) => {},
		leaveRoom: (state, action: PayloadAction<string>) => {},
		setRoom: (state, action: PayloadAction<Chat>) => ({
			...state,
			room: action.payload.room,
			messages: action.payload.messages
		}),
		setMessages: (state, action: PayloadAction<Array<Message>>) => ({
			...state,
			messages: action.payload
		}),
		sendMessage: (state, action: PayloadAction<{ room: string; message: Message }>) => {},
		receiveMessage: (state, action: PayloadAction<Message>) => ({
			...state,
			messages: state.messages.concat(action.payload)
		})
	}
});

export const {
	createRoom,
	joinRoom,
	leaveRoom,
	setRoom,
	sendMessage,
	setMessages,
	receiveMessage
} = chatSlice.actions;
export const { reducer } = chatSlice;
