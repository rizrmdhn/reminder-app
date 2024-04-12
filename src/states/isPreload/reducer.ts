import { UnknownAction } from "redux";
import { ActionType, SetIsPreloadAction } from "./action";

export type TIsPreloadState = null | boolean;

const initialState: TIsPreloadState = null;

function isPreloadReducer(
  state: TIsPreloadState = initialState,
  action: UnknownAction
): TIsPreloadState {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return (action as SetIsPreloadAction).payload.isPreload;
    default:
      return state;
  }
}

export default isPreloadReducer;
