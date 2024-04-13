import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import NewTodoForm from "./NewTodoForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { asyncSetIsAddNewTodo } from "@/states/isAddNewTodo/action";
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";

type AddNewTodoButtonProps = {
  className?: string;
};

export default function AddNewTodoButton({ className }: AddNewTodoButtonProps) {
  const isAddNewTodo = useAppSelector((state) => state.isAddNewTodo);

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isAddNewTodo}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(asyncSetIsAddNewTodo(false));
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn("w-full", className)}
          onClick={() => dispatch(asyncSetIsAddNewTodo(true))}
        >
          <CirclePlus className="mr-2 h-4 w-4" />
          Add new task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new todo task</DialogTitle>
          <DialogDescription>
            Here you can create a new task to be done. You can add a title and
            description to it.
          </DialogDescription>
          <NewTodoForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
