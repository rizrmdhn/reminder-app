import { ActionCreatorSinglePayload } from "@/types/state"
import { AppDispatch } from ".."

export enum ActionType {
  SET_IS_ADD_NEW_TODO = "SET_IS_ADD_NEW_TODO",
}

export function setIsAddNewTodoActionCreator(isAddNewTodo: boolean): ActionCreatorSinglePayload<boolean> {
  return {
    type: ActionType.SET_IS_ADD_NEW_TODO,
    payload: isAddNewTodo,
  }
}

function asyncSetIsAddNewTodo(isAddNewTodo: boolean) {
  return (dispatch: AppDispatch) => {
    dispatch(setIsAddNewTodoActionCreator(isAddNewTodo))
  }
}

export { asyncSetIsAddNewTodo }
