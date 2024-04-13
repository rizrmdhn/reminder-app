import { FileEditIcon, TrashIcon } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type ReminderItemProps = {
  title: string;
  description: string;
  timeReminder: string;
  createdAt: string;
  updatedAt: string;
  onDelete: () => void;
};

export default function ReminderItem({
  title,
  description,
  timeReminder,
  createdAt,
  updatedAt,
  onDelete,
}: ReminderItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {moment(timeReminder).format("dddd, DD MMMM YYYY HH:mm")}
        </p>
      </div>
      <div>
        <div className="flex flex-col items-end gap-4">
          <Button className="text-white hover:bg-orange-400 dark:text-orange-400 dark:hover:bg-orange-500">
            <FileEditIcon className="mr-2 inline h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="text-white hover:bg-red-400 dark:text-red-400 dark:hover:bg-red-500">
                <TrashIcon className="mr-2 inline h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => onDelete()}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
