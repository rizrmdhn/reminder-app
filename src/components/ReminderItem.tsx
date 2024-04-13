import { FileEditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"

export default function ReminderItem() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Meeting with the team</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</p>
      </div>
      <div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </div>
        <div>
          <div>
            <div>
              <FileEditIcon className="mr-2 inline h-4 w-4" />
              Edit
            </div>
            <div>
              <TrashIcon className="mr-2 inline h-4 w-4" />
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
