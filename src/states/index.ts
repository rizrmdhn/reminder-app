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

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    isAddNewTodo: isAddNewTodoReducer,
    isAddNewReminder: isAddNewReminderReducer,
    todos: todoReducer,
    reminder: reminderReducer,
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
