import { FileEditIcon, TrashIcon } from "lucide-react";
import { Label } from "./ui/label";
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
} from "@/components/ui/alert-dialog";
import moment from "moment";
import "moment/locale/id";

type TodoItemProps = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  onDelete: () => void;
};

export default function TodoItem({
  title,
  description,
  createdAt,
  updatedAt,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="mx-3 flex items-center justify-between p-4">
      <div className="flex flex-col items-start gap-4">
        <div className="title-and-description flex flex-col gap-4">
          <div className="truncate font-bold">{title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Label className="text-sm">
            Created at:{" "}
            <span className="font-bold">
              {moment(createdAt).locale("id").format("dddd, DD MMMM YYYY")}
            </span>
          </Label>
          <Label className="text-sm">
            Updated at:
            <span className="font-bold">
              {moment(updatedAt).locale("id").format("dddd, DD MMMM YYYY")}
            </span>
          </Label>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4">
        <Button className="text-white hover:bg-orange-400 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white">
          <FileEditIcon className="mr-2 inline h-4 w-4" />
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-white hover:bg-red-400 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white">
              <TrashIcon className="mr-2 inline h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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
  );
}
