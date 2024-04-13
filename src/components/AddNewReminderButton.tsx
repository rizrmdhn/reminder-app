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
import { cn } from "@/lib/utils";
import { CirclePlus } from "lucide-react";

type AddNewReminderButtonProps = {
  className?: string;
};

export default function AddNewReminderButton({
  className,
}: AddNewReminderButtonProps) {
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
          className={cn("w-full", className)}
          onClick={() => dispatch(asyncSetIsAddNewReminder(true))}
        >
          <CirclePlus className="mr-2 h-4 w-4" />
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
