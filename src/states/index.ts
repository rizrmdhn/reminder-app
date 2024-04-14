// Redux imports
import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAddNewTodoReducer from "./isAddNewTodo/reducer";
import todoReducer from "./todos/reducer";
import reminderReducer from "./reminder/reducer";
import isAddNewReminderReducer from "./isAddNewReminder/reducer";
import themeReducer from "./theme/reducer";
import localeReducer from "./locale/reducer";
import isEditTodoReducer from "./isEditTodo/reducer";
import isEditReminderReducer from "./isEditReminder/reducer";
import detailTodoReducer from "./detailTodo/reducer";
import detailReminderReducer from "./detailReminder/reducer";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    isAddNewTodo: isAddNewTodoReducer,
    isEditTodo: isEditTodoReducer,
    isAddNewReminder: isAddNewReminderReducer,
    isEditReminder: isEditReminderReducer,
    todos: todoReducer,
    detailTodo: detailTodoReducer,
    reminder: reminderReducer,
    detailReminder: detailReminderReducer,
    theme: themeReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  { type: string } & Record<string, unknown>
>;
export type AppGetState = typeof store.getState;
