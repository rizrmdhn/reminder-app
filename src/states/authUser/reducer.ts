import { User } from "@/types/user";
import { UnknownAction } from "redux";
import { ActionType } from "../authUser/action";
import { ActionCreator, StateStatus } from "@/types/state";

export type TAuthUserState = {
  status: StateStatus;
  data: User | null;
};

const initialState: TAuthUserState = {
  status: "Initial",
  data: null,
};

export default function authUserReducer(
  state = initialState,
  action: UnknownAction
): TAuthUserState {
  switch (action.type) {
    case ActionType.SET_AUTH_USER: {
      const {
        payload: { data, status },
      } = action as ActionCreator<User | null>;
      return {
        ...state,
        status,
        data,
      };
    }
    case ActionType.UNSET_AUTH_USER: {
      const {
        payload: { status, data },
      } = action as ActionCreator<null>;
      return {
        ...state,
        status,
        data,
      };
    }
    default:
      return state;
  }
}
