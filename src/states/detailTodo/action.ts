import { todos } from "@/lib/api";
import { ActionCreator, ActionCreatorStateStatus } from "@/types/state";
import { Todo } from "@/types/todo";
import { AppDispatch } from "..";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/response";
import { TToast } from "@/components/ui/use-toast";

export enum ActionType {
  GET_DETAIL_TODO = "GET_DETAIL_TODO",
}

function receiveDetailTodoActionCreator(
  status: ActionCreatorStateStatus,
  data: Todo | null,
): ActionCreator<Todo | null> {
  return {
    type: ActionType.GET_DETAIL_TODO,
    payload: {
      status,
      data,
    },
  };
}

export function asyncGetDetailTodo(id: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveDetailTodoActionCreator("Loading", null));
    try {
      const todo = await todos.getTodoDetail(id);
      dispatch(receiveDetailTodoActionCreator("Success", todo));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(receiveDetailTodoActionCreator("Error", null));
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
      dispatch(receiveDetailTodoActionCreator("Error", null));
    }
  };
}

export { receiveDetailTodoActionCreator };
