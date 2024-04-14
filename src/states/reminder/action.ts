import { reminders } from "@/lib/api";
import { ActionCreator, ActionCreatorStateStatus } from "@/types/state";
import { AppDispatch } from "..";
import { AxiosError } from "axios";
import { ErrorResponse, SchemaErrorResponse } from "@/types/response";
import { TToast } from "@/components/ui/use-toast";
import { Reminder } from "@/types/reminder";
import { asyncSetIsAddNewReminder } from "../isAddNewReminder/action";
import { asyncSetIsEditReminder } from "../isEditReminder/action";

export enum ActionType {
  GET_REMINDERS = "GET_REMINDERS",
  CREATE_REMINDER = "CREATE_REMINDER",
  DELETE_REMINDER = "DELETE_REMINDER",
  UPDATE_REMINDER = "UPDATE_REMINDER",
}

function receiveRemindersActionCreator(
  status: ActionCreatorStateStatus,
  data: Reminder[],
): ActionCreator<Reminder[]> {
  return {
    type: ActionType.GET_REMINDERS,
    payload: {
      status,
      data,
    },
  };
}

function createReminderActionCreator(
  status: ActionCreatorStateStatus,
  data: Reminder | null,
): ActionCreator<Reminder | null> {
  return {
    type: ActionType.CREATE_REMINDER,
    payload: {
      status,
      data,
    },
  };
}

function deleteReminderActionCreator(
  status: ActionCreatorStateStatus,
  data: string,
): ActionCreator<string> {
  return {
    type: ActionType.DELETE_REMINDER,
    payload: {
      status,
      data,
    },
  };
}

function updateReminderActionCreator(
  status: ActionCreatorStateStatus,
  data: Reminder | null,
): ActionCreator<Reminder | null> {
  return {
    type: ActionType.UPDATE_REMINDER,
    payload: {
      status,
      data,
    },
  };
}

function asyncGetReminders(toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveRemindersActionCreator("Loading", []));
    try {
      const reminder = await reminders.getReminderList();
      dispatch(receiveRemindersActionCreator("Success", reminder));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(receiveRemindersActionCreator("Error", []));
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
      dispatch(receiveRemindersActionCreator("Error", []));
    }
  };
}

function asyncCreateReminder(
  idTodo: string,
  title: string,
  description: string,
  timeReminder: string,
  toast: TToast,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(createReminderActionCreator("Loading", null));
    try {
      const newReminder = await reminders.createReminder(
        idTodo,
        title,
        description,
        timeReminder,
      );
      dispatch(createReminderActionCreator("Success", newReminder));
      toast({
        title: "Success",
        description: "Reminder created successfully",
      });
      dispatch(asyncSetIsAddNewReminder(false));
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data.errors) {
        dispatch(createReminderActionCreator("Error", null));
        schemaError.response?.data.errors.forEach((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
        return;
      }

      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(createReminderActionCreator("Error", null));
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
      dispatch(createReminderActionCreator("Error", null));
    }
  };
}

function asyncDeleteReminder(id: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteReminderActionCreator("Loading", id));
    try {
      await reminders.deleteReminder(id);
      dispatch(deleteReminderActionCreator("Success", id));
      toast({
        title: "Success",
        description: "Reminder deleted successfully",
      });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(deleteReminderActionCreator("Error", id));
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
      dispatch(deleteReminderActionCreator("Error", id));
    }
  };
}

function asyncUpdateReminder(
  id: string,
  title: string,
  description: string,
  timeReminder: string,
  toast: TToast,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(updateReminderActionCreator("Loading", null));
    try {
      const updatedReminder = await reminders.updateReminder(
        id,
        title,
        description,
        timeReminder,
      );
      dispatch(updateReminderActionCreator("Success", updatedReminder));
      toast({
        title: "Success",
        description: "Reminder updated successfully",
      });
      dispatch(asyncSetIsEditReminder(false));
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data.errors) {
        dispatch(updateReminderActionCreator("Error", null));
        schemaError.response?.data.errors.forEach((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
        return;
      }

      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(updateReminderActionCreator("Error", null));
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
      dispatch(updateReminderActionCreator("Error", null));
    }
  };
}

export {
  asyncGetReminders,
  asyncCreateReminder,
  asyncDeleteReminder,
  asyncUpdateReminder,
};
