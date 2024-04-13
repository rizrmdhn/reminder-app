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
import { asyncSetIsAddNewReminder } from "@/states/isAddNewReminder/action";
import NewReminderForm from "./NewReminderForm";

export default function AddNewReminderButton() {
  const isAddNewReminder = useAppSelector((state) => state.isAddNewReminder);

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isAddNewReminder}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(asyncSetIsAddNewReminder(false));
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full"
          onClick={() => dispatch(asyncSetIsAddNewReminder(true))}
        >
          Add new reminder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new reminder</DialogTitle>
          <DialogDescription>
            Here you can create a new reminder. Fill the form below and click
          </DialogDescription>
          <NewReminderForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
