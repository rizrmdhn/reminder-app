import { ActionCreator, StateStatus } from "@/types/state";
import { Todo } from "@/types/todo";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

export type TTodoState = {
  status: StateStatus;
  data: Todo[];
};

const initialState: TTodoState = {
  status: "Initial",
  data: [],
};

export default function todoReducer(
  state = initialState,
  action: UnknownAction,
): TTodoState {
  switch (action.type) {
    case ActionType.GET_TODOS: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Todo[]>;
      return {
        ...state,
        status,
        data,
      };
    }
    case ActionType.CREATE_TODO: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Todo | null>;
      return {
        ...state,
        status,
        data: status === "Success" && data ? [...state.data, data] : state.data,
      };
    }
    case ActionType.DELETE_TODO: {
      const {
        payload: { data, status },
      } = action as ActionCreator<string>;
      return {
        ...state,
        status,
        data:
          status === "Success" && state.data
            ? state.data.filter((todo) => todo.todoId !== data)
            : state.data,
      };
    }
    case ActionType.UPDATE_TODO: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Todo | null>;
      return {
        ...state,
        status,
        data:
          status === "Success" && state.data
            ? state.data.map((todo) =>
                todo.todoId === data?.todoId ? data : todo,
              )
            : state.data,
      };
    }
    default:
      return state;
  }
}
