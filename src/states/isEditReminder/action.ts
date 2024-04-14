import { ActionCreatorSinglePayload } from "@/types/state";
import { AppDispatch } from "..";

export enum ActionType {
  SET_IS_EDIT_REMINDER = "SET_IS_EDIT_REMINDER",
}

export function setIsEditReminderActionCreator(
  isEditReminder: boolean,
): ActionCreatorSinglePayload<boolean> {
  return {
    type: ActionType.SET_IS_EDIT_REMINDER,
    payload: isEditReminder,
  };
}

function asyncSetIsEditReminder(isEditReminder: boolean) {
  return (dispatch: AppDispatch) => {
    dispatch(setIsEditReminderActionCreator(isEditReminder));
  };
}

export { asyncSetIsEditReminder };
