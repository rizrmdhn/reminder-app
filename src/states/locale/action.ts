import { localStorageFunctions } from "@/lib/api";
import { ActionCreatorSinglePayload } from "@/types/state";
import { AppDispatch } from "..";

export enum ActionType {
  SET_LOCALE = "SET_LOCALE",
}

export function setLocale(locale: string): ActionCreatorSinglePayload<string> {
  return {
    type: ActionType.SET_LOCALE,
    payload: locale,
  };
}

function asyncGetLocalLocale() {
  return async (dispatch: AppDispatch) => {
    const localLocale = localStorageFunctions.getLocale();
    const locale = localLocale || "en";

    dispatch(setLocale(locale));
  };
}

function asyncSetLocale(locale: string) {
  return async (dispatch: AppDispatch) => {
    localStorageFunctions.setLocale(locale);
    dispatch(setLocale(locale));
  };
}

export { asyncSetLocale, asyncGetLocalLocale };
