import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

type InitialState = {
	user: null;
	isError: boolean;
	isSucces: boolean;
	isLoading: boolean;
	message: string;
};

type UserData = {
	name: string;
	email: string;
	password: string;
};

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

function userReducer(state = initialState, action: { type: any }) {
	switch (action.type) {
		case "RESET":
			return {
				...state,
				user: {},
			};
		default:
			return state;
	}
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		register: (state, action) => {
			console.log(action.payload);
		},
	},
	extraReducers: builder => {},
});

export default authSlice.reducer;
