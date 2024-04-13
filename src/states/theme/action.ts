import { ActionCreatorSinglePayload } from "@/types/state";
import { AppDispatch } from "..";
import { localStorageFunctions } from "@/lib/api";

export enum ActionType {
  SET_THEME = "SET_THEME",
}

function setTheme(theme: string): ActionCreatorSinglePayload<string> {
  return {
    type: ActionType.SET_THEME,
    payload: theme,
  };
}

function asyncGetLocalTheme() {
  return async (dispatch: AppDispatch) => {
    const localTheme = localStorageFunctions.getTheme();
    const colorTheme = localTheme === "light" ? "light" : "dark";

    const root = window.document.documentElement;
    if (localTheme) {
      dispatch(setTheme(localTheme));
      root.classList.remove(localTheme);
      root.classList.add(colorTheme);
    } else {
      localStorageFunctions.setTheme(colorTheme);
      dispatch(setTheme(colorTheme));
      root.classList.add(colorTheme);
    }
  };
}

function asyncSetTheme(theme: string) {
  return async (dispatch: AppDispatch) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorageFunctions.setTheme(theme);
    dispatch(setTheme(theme));
  };
}

export { asyncSetTheme, asyncGetLocalTheme };
