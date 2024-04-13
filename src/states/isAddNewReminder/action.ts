import { ActionCreatorSinglePayload } from "@/types/state";
import { AppDispatch } from "..";

export enum ActionType {
  SET_IS_ADD_NEW_REMINDER = "SET_IS_ADD_NEW_REMINDER",
}

export function setIsAddNewReminderActionCreator(
  isAddNewReminder: boolean,
): ActionCreatorSinglePayload<boolean> {
  return {
    type: ActionType.SET_IS_ADD_NEW_REMINDER,
    payload: isAddNewReminder,
  };
}

function asyncSetIsAddNewReminder(isAddNewReminder: boolean) {
  return (dispatch: AppDispatch) => {
    dispatch(setIsAddNewReminderActionCreator(isAddNewReminder));
  };
}

export { asyncSetIsAddNewReminder };
