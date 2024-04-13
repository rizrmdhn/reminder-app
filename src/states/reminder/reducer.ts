import { Reminder } from "@/types/reminder";
import { ActionCreator, StateStatus } from "@/types/state";
import { UnknownAction } from "redux";

export type TReminderState = {
  status: StateStatus;
  data: Reminder[];
};

const initialState: TReminderState = {
  status: "Initial",
  data: [],
};

export default function reminderReducer(
  state = initialState,
  action: UnknownAction,
): TReminderState {
  switch (action.type) {
    case "GET_REMINDERS": {
      const {
        payload: { data, status },
      } = action as ActionCreator<Reminder[]>;
      return {
        ...state,
        status,
        data,
      };
    }
    case "CREATE_REMINDER": {
      const {
        payload: { data, status },
      } = action as ActionCreator<Reminder | null>;
      return {
        ...state,
        status,
        data: status === "Success" && data ? [...state.data, data] : state.data,
      };
    }
    case "DELETE_REMINDER": {
      const {
        payload: { data, status },
      } = action as ActionCreator<string>;
      return {
        ...state,
        status,
        data:
          status === "Success" && state.data
            ? state.data.filter((reminder) => reminder.reminderId !== data)
            : state.data,
      };
    }
    default:
      return state;
  }
}
