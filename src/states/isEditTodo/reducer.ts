import { ActionCreatorSinglePayload } from "@/types/state";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

export type TIsEditTodoState = boolean;

const initialState: TIsEditTodoState = false;

export default function isEditTodoReducer(
  state = initialState,
  action: UnknownAction,
): TIsEditTodoState {
  switch (action.type) {
    case ActionType.SET_IS_EDIT_TODO: {
      const { payload } = action as ActionCreatorSinglePayload<boolean>;
      return payload;
    }
    default:
      return state;
  }
}
