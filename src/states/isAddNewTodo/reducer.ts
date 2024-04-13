import { ActionCreatorSinglePayload } from "@/types/state"
import { UnknownAction } from "redux"
import { ActionType } from "./action"

export type TIsAddNewTodoState = boolean

const initialState: TIsAddNewTodoState = false

export default function isAddNewTodoReducer(state = initialState, action: UnknownAction): TIsAddNewTodoState {
  switch (action.type) {
    case ActionType.SET_IS_ADD_NEW_TODO: {
      const { payload } = action as ActionCreatorSinglePayload<boolean>
      return payload
    }
    default:
      return state
  }
}
