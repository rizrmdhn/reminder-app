import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { FileEditIcon } from "lucide-react";
import useLocale from "@/hooks/useLocale";
import { asyncSetIsEditTodo } from "@/states/isEditTodo/action";
import EditTodoForm from "./EditTodoForm";
import { asyncGetDetailTodo } from "@/states/detailTodo/action";
import { toast } from "./ui/use-toast";

type EditTodoButtonProps = {
  className?: string;
  todoId: string;
};

export default function EditTodoButton({
  className,
  todoId,
}: EditTodoButtonProps) {
  const isEditTodo = useAppSelector((state) => state.isEditTodo);

  const { txtEdit, txtEditTodo, txtEditTodoDesc } = useLocale();

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isEditTodo}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(asyncSetIsEditTodo(false));
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn("w-full", className)}
          onClick={() => {
            dispatch(asyncSetIsEditTodo(true));
            dispatch(asyncGetDetailTodo(todoId, toast));
          }}
        >
          <FileEditIcon className="mr-2 h-4 w-4" />
          {txtEdit}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{txtEditTodo}</DialogTitle>
          <DialogDescription>{txtEditTodoDesc}</DialogDescription>
          <EditTodoForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
