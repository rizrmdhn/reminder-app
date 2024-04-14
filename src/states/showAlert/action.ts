import { ActionCreatorSinglePayload } from "@/types/state";

export enum ActionType {
  SHOW_ALERT = "SHOW_ALERT",
}

function setShowAlert(bool: boolean): ActionCreatorSinglePayload<boolean> {
  return {
    type: ActionType.SHOW_ALERT,
    payload: bool,
  };
}

export { setShowAlert };
