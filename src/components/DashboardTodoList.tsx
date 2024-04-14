import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
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
import AddNewTodoButton from "./AddNewTodoButton";
import useLocale from "@/hooks/useLocale";

type DashboardTodoListProps = {
  needAddTodo?: boolean;
};

export default function DashboardTodoList({
  needAddTodo = false,
}: DashboardTodoListProps) {
  const todos = useAppSelector((state) => state.todos);

  const { txtTaskList, txtTodayTask, txtNoTask, txtSomethingWentWrong } =
    useLocale();

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetTodos(toast));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderTodos() {
    if (todos.status === "Loading") {
      return <Skeleton count={5} />;
    }

    if (todos.status === "Error") {
      return <p className="p-6 text-red-500">{txtSomethingWentWrong}</p>;
    }

    if (todos.data.length === 0) {
      return <p className="p-6 text-muted-foreground">{txtNoTask}</p>;
    } else {
      return todos.data.map((todo) => (
        <TodoItem
          key={todo.todoId}
          todoId={todo.todoId}
          title={todo.title}
          description={todo.description}
          createdAt={todo.createdAt}
          updatedAt={todo.updatedAt}
          onDelete={() => dispatch(asyncDeleteTodo(todo.todoId, toast))}
        />
      ));
    }
  }

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>{txtTaskList}</CardTitle>
        <CardDescription>{txtTodayTask}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">{renderTodos()}</div>
      </CardContent>
      {needAddTodo && (
        <CardFooter>
          <AddNewTodoButton />
        </CardFooter>
      )}
    </Card>
  );
}
