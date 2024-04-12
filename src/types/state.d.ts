export type StateStatus = "Initial" | "Loading" | "Success" | "Error";
export type ActionCreatorStateStatus = "Loading" | "Success" | "Error";

export type ReducerState<T> = {
  status: StateStatus;
  data: T;
};

export type ActionCreator<T> = {
  type: string;
  payload: {
    status: ActionCreatorStatus;
    data: T;
  };
};
