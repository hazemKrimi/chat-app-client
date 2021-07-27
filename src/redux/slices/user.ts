import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

const initialState: { socket: Socket | null } = {
	socket: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		initUser: () => {},
		setUser: (state, action: PayloadAction<Socket>) => ({
			...state,
			socket: action.payload
		})
	}
});

export const { initUser, setUser } = userSlice.actions;
export const { reducer } = userSlice;
