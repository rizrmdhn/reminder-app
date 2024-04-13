import { todos } from "@/lib/api";
import { ActionCreator, ActionCreatorStateStatus } from "@/types/state";
import { Todo } from "@/types/todo";
import { AppDispatch } from "..";
import { AxiosError } from "axios";
import { ErrorResponse, SchemaErrorResponse } from "@/types/response";
import { TToast } from "@/components/ui/use-toast";
import { asyncSetIsAddNewTodo } from "../isAddNewTodo/action";

export enum ActionType {
  GET_TODOS = "GET_TODOS",
  CREATE_TODO = "CREATE_TODO",
  DELETE_TODO = "DELETE_TODO",
}

function receiveTodosActionCreator(
  status: ActionCreatorStateStatus,
  data: Todo[],
): ActionCreator<Todo[]> {
  return {
    type: ActionType.GET_TODOS,
    payload: {
      status,
      data,
    },
  };
}

function createTodoActionCreator(
  status: ActionCreatorStateStatus,
  data: Todo | null,
): ActionCreator<Todo | null> {
  return {
    type: ActionType.CREATE_TODO,
    payload: {
      status,
      data,
    },
  };
}

function deleteTodoActionCreator(
  status: ActionCreatorStateStatus,
  data: string,
): ActionCreator<string> {
  return {
    type: ActionType.DELETE_TODO,
    payload: {
      status,
      data,
    },
  };
}

function asyncGetTodos(toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(receiveTodosActionCreator("Loading", []));
    try {
      const todo = await todos.getTodoList();
      dispatch(receiveTodosActionCreator("Success", todo));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(receiveTodosActionCreator("Error", []));
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
      dispatch(receiveTodosActionCreator("Error", []));
    }
  };
}

function asyncCreateTodo(title: string, description: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(createTodoActionCreator("Loading", null));
    try {
      const todo = await todos.createTodo(title, description);
      dispatch(createTodoActionCreator("Success", todo));
      dispatch(asyncSetIsAddNewTodo(false));
    } catch (error) {
      const schemaError = error as AxiosError<SchemaErrorResponse>;
      if (schemaError.response?.data.errors) {
        dispatch(createTodoActionCreator("Error", null));
        schemaError.response?.data.errors.forEach((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
        return;
      }

      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(createTodoActionCreator("Error", null));
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
      dispatch(createTodoActionCreator("Error", null));
    }
  };
}

function asyncDeleteTodo(todoId: string, toast: TToast) {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteTodoActionCreator("Loading", ""));
    try {
      await todos.deleteTodo(todoId);
      dispatch(deleteTodoActionCreator("Success", todoId));
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      if (err.response?.data.meta.message) {
        dispatch(deleteTodoActionCreator("Error", ""));
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
      dispatch(deleteTodoActionCreator("Error", ""));
    }
  };
}

export { asyncGetTodos, asyncCreateTodo, asyncDeleteTodo };
