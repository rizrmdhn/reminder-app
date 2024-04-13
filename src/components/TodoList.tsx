import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import AddNewTodoButton from "./AddNewTodoButton";
import TodoItem from "./TodoItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";
import { asyncDeleteTodo, asyncGetTodos } from "@/states/todos/action";
import Skeleton from "react-loading-skeleton";

export default function TodoList() {
  const todos = useAppSelector((state) => state.todos);

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetTodos(toast));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderTodos() {
    if (todos.status === "Loading") {
      return <Skeleton count={5} />;
    } else if (todos.status === "Error") {
      return (
        <div className="text-red-500">
          Something went wrong. Please try again later.
        </div>
      );
    } else {
      if (todos.data.length === 0) {
        return (
          <p className="p-6 text-muted-foreground">
            No todos found. Create a new one?
          </p>
        );
      } else {
        return todos.data.map((todo) => (
          <TodoItem
            key={todo.todoId}
            title={todo.title}
            description={todo.description}
            createdAt={todo.createdAt}
            updatedAt={todo.updatedAt}
            onDelete={() => dispatch(asyncDeleteTodo(todo.todoId, toast))}
          />
        ));
      }
    }
  }

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Todo List</CardTitle>
        <CardDescription>Today's tasks</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">{renderTodos()}</div>
      </CardContent>
      <CardFooter>
        <AddNewTodoButton />
      </CardFooter>
    </Card>
  );
}
