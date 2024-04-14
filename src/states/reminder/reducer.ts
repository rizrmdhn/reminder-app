import { Reminder } from "@/types/reminder";
import { ActionCreator, StateStatus } from "@/types/state";
import { UnknownAction } from "redux";
import { ActionType } from "./action";

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
    case ActionType.GET_REMINDERS: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Reminder[]>;
      return {
        ...state,
        status,
        data,
      };
    }
    case ActionType.CREATE_REMINDER: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Reminder | null>;
      return {
        ...state,
        status,
        data: status === "Success" && data ? [...state.data, data] : state.data,
      };
    }
    case ActionType.DELETE_REMINDER: {
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
    case ActionType.UPDATE_REMINDER: {
      const {
        payload: { data, status },
      } = action as ActionCreator<Reminder | null>;
      return {
        ...state,
        status,
        data:
          status === "Success" && state.data
            ? state.data.map((reminder) =>
                reminder.reminderId === data?.reminderId ? data : reminder,
              )
            : state.data,
      };
    }
    default:
      return state;
  }
}
