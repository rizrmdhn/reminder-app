import { ActionType } from "./action";
import { UnknownAction } from "redux";
import { ActionCreatorSinglePayload } from "@/types/state";

export type TShowAlert = boolean;

export const initialState: TShowAlert = false;

export default function showAlertReducer(
  state: TShowAlert = initialState,
  action: UnknownAction,
): TShowAlert {
  switch (action.type) {
    case ActionType.SHOW_ALERT: {
      const { payload } = action as ActionCreatorSinglePayload<boolean>;
      return payload;
    }
    default:
      return state;
  }
}
