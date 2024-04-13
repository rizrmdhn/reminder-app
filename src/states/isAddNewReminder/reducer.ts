import { ActionCreatorSinglePayload } from "@/types/state";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

export type TIsAddNewReminderState = boolean;

const initialState: TIsAddNewReminderState = false;

export default function isAddNewReminderReducer(
  state = initialState,
  action: UnknownAction,
): TIsAddNewReminderState {
  switch (action.type) {
    case ActionType.SET_IS_ADD_NEW_REMINDER: {
      const { payload } = action as ActionCreatorSinglePayload<boolean>;
      return payload;
    }
    default:
      return state;
  }
}
