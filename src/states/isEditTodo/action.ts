import { ActionCreatorSinglePayload } from "@/types/state";
import { AppDispatch } from "..";

export enum ActionType {
  SET_IS_EDIT_TODO = "SET_IS_EDIT_TODO",
}

export function setIsEditTodoActionCreator(
  isEditTodo: boolean,
): ActionCreatorSinglePayload<boolean> {
  return {
    type: ActionType.SET_IS_EDIT_TODO,
    payload: isEditTodo,
  };
}

function asyncSetIsEditTodo(isEditTodo: boolean) {
  return (dispatch: AppDispatch) => {
    dispatch(setIsEditTodoActionCreator(isEditTodo));
  };
}

export { asyncSetIsEditTodo };
