import { ActionCreatorSinglePayload } from "@/types/state";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

export type TIsEditReminderState = boolean;

const initialState: TIsEditReminderState = false;

export default function isEditReminderReducer(
  state = initialState,
  action: UnknownAction,
): TIsEditReminderState {
  switch (action.type) {
    case ActionType.SET_IS_EDIT_REMINDER: {
      const { payload } = action as ActionCreatorSinglePayload<boolean>;
      return payload;
    }
    default:
      return state;
  }
}
