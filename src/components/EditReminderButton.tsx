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
import EditReminderForm from "./EditReminderForm";
import { toast } from "./ui/use-toast";
import { asyncGetDetailReminder } from "@/states/detailReminder/action";
import { asyncSetIsEditReminder } from "@/states/isEditReminder/action";

type EditReminderButtonProps = {
  className?: string;
  reminderId: string;
};

export default function EditReminderButton({
  className,
  reminderId,
}: EditReminderButtonProps) {
  const isEditReminder = useAppSelector((state) => state.isEditReminder);

  const { txtEdit, txtEditReminder, txtEditReminderDesc } = useLocale();

  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isEditReminder}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          dispatch(asyncSetIsEditReminder(false));
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn("w-full", className)}
          onClick={() => {
            dispatch(asyncSetIsEditReminder(true));
            dispatch(asyncGetDetailReminder(reminderId, toast));
          }}
        >
          <FileEditIcon className="mr-2 h-4 w-4" />
          {txtEdit}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{txtEditReminder}</DialogTitle>
          <DialogDescription>{txtEditReminderDesc}</DialogDescription>
          <EditReminderForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
