import { userReducer } from "./accountReducer";
import authReducer from "../auth/authSlice";
import { combineReducers } from "redux";

const reducers = combineReducers({
	user: userReducer,
	auth: authReducer,
});

export { reducers };

export type State = ReturnType<typeof reducers>;
