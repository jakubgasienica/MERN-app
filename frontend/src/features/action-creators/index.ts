import { Dispatch } from "redux";
import { ActionType, Action } from "../actions";

export const addUser = (amount: number) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.Add,
		});
	};
};
