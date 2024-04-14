import { ActionCreator, StateStatus } from "@/types/state";
import { Reminder } from "@/types/reminder";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

export type TReminderState = {
  status: StateStatus;
  data: Reminder | null;
};

const initialState: TReminderState = {
  status: "Initial",
  data: null,
};

export default function detailReminderReducer(
  state = initialState,
  action: UnknownAction,
): TReminderState {
  switch (action.type) {
    case ActionType.GET_DETAIL_REMINDER: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Reminder | null>;
      return {
        ...state,
        status,
        data,
      };
    }
    default:
      return state;
  }
}
