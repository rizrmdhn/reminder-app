import { UnknownAction } from "redux";
import { ActionType } from "./action";
import { ActionCreatorSinglePayload } from "@/types/state";

export type TLocaleState = string;

const initialState: TLocaleState = "en";

export default function localeReducer(
  state = initialState,
  action: UnknownAction,
): TLocaleState {
  switch (action.type) {
    case ActionType.SET_LOCALE: {
      const { payload: locale } = action as ActionCreatorSinglePayload<string>;
      return locale;
    }
    default:
      return state;
  }
}
