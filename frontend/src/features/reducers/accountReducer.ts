import { InitialState, Action, ActionType } from "../actions/index";

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

function userReducer(state: InitialState = initialState, action: Action) {
	switch (action.type) {
		case ActionType.Add:
			return {
				...state,
				user: {
					user: "kuba",
					isError: false,
					isSuccess: false,
					isLoading: false,
					message: "test",
				},
			};
		default:
			return state;
	}
}

export { userReducer };
