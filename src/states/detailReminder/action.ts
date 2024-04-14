import { reminders } from "@/lib/api";
import { ActionCreator, ActionCreatorStateStatus } from "@/types/state";
import { Reminder } from "@/types/reminder";
import { AppDispatch } from "..";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { TToast } from "@/components/ui/use-toast";

export enum ActionType {
  GET_DETAIL_REMINDER = "GET_DETAIL_REMINDER",
}

function receiveDetailReminderActionCreator(
  status: ActionCreatorStateStatus,
  data: Reminder | null,
): ActionCreator<Reminder | null> {
  return {
    type: ActionType.GET_DETAIL_REMINDER,
    payload: {
      status,
      data,
    },
  };
}

export function asyncGetDetailReminder(id: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveDetailReminderActionCreator("Loading", null));
    try {
      const reminder = await reminders.getReminderDetail(id);
      dispatch(receiveDetailReminderActionCreator("Success", reminder));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(receiveDetailReminderActionCreator("Error", null));
        toast({
          title: "Error",
          description: err.response.data.meta.message,
        });

        return;
      }

      toast({
        title: "Error",
        description: "An error occurred",
      });
      dispatch(receiveDetailReminderActionCreator("Error", null));
    }
  };
}

export { receiveDetailReminderActionCreator };
