import { ActionCreator, StateStatus } from "@/types/state";
import { Todo } from "@/types/todo";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

export type TDetailTodoState = {
  status: StateStatus;
  data: Todo | null;
};

const initialState: TDetailTodoState = {
  status: "Initial",
  data: null,
};

export default function detailTodoReducer(
  state = initialState,
  action: UnknownAction,
): TDetailTodoState {
  switch (action.type) {
    case ActionType.GET_DETAIL_TODO: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Todo | null>;
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
