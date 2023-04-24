type InitialState = {
	user: null;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
};

export enum ActionType {
	Add = "add",
}

type Action = {
	type: ActionType.Add;
};

export type { InitialState, Action };
