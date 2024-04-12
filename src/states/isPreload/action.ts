import { auth } from "@/lib/api";
import { AppDispatch } from "..";
import { receiveAuthUserActionCreator } from "../authUser/action";

export enum ActionType {
  SET_IS_PRELOAD = "SET_PRELOAD",
}

export type SetIsPreloadAction = {
  type: ActionType.SET_IS_PRELOAD;
  payload: {
    isPreload: boolean | null;
  };
};

function setIsPreloadActionCreator(
  isPreload: boolean | null
): SetIsPreloadAction {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncSetIsPreload() {
  return async (dispatch: AppDispatch) => {
    try {
      const authUser = await auth.getMe();
      dispatch(receiveAuthUserActionCreator("Success", authUser));
    } catch (error) {
      dispatch(setIsPreloadActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { asyncSetIsPreload };
