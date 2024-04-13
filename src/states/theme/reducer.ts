import { UnknownAction } from "redux";
import { ActionType } from "./action";
import { ActionCreatorSinglePayload } from "@/types/state";

export type TThemeState = string;

const initialState: TThemeState = "light";

export default function themeReducer(
  state = initialState,
  action: UnknownAction,
): TThemeState {
  switch (action.type) {
    case ActionType.SET_THEME: {
      const { payload: theme } = action as ActionCreatorSinglePayload<string>;
      return theme;
    }
    default:
      return state;
  }
}
