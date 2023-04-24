import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const storeMern = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export type AppDispatch = typeof storeMern.dispatch;
export type RootState = ReturnType<typeof storeMern.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
