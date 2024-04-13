import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import NewTodoForm from "./NewTodoForm"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { asyncSetIsAddNewTodo } from "@/states/isAddNewTodo/action"

export default function AddNewTodoButton() {
  const isAddNewTodo = useAppSelector((state) => state.isAddNewTodo)

  const dispatch = useAppDispatch()

  return (
    <Dialog
      open={isAddNewTodo}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(asyncSetIsAddNewTodo(false))
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" className="w-full" onClick={() => dispatch(asyncSetIsAddNewTodo(true))}>
          Add new task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new todo task</DialogTitle>
          <DialogDescription>
            Here you can create a new task to be done. You can add a title and description to it.
          </DialogDescription>
          <NewTodoForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
