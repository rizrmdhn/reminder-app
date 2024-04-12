// Redux imports
import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  { type: string } & Record<string, unknown>
>;
export type AppGetState = typeof store.getState;
