import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import ReminderItem from "./ReminderItem";
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
import {
  asyncDeleteReminder,
  asyncGetReminders,
} from "@/states/reminder/action";
import Skeleton from "react-loading-skeleton";
import AddNewReminderButton from "./AddNewReminderButton";
import useLocale from "@/hooks/useLocale";

type DashboardReminderListProps = {
  needAddReminder?: boolean;
};

export default function DashboardReminderList({
  needAddReminder = false,
}: DashboardReminderListProps) {
  const reminders = useAppSelector((state) => state.reminder);

  const {
    txtReminderList,
    txtTodayReminder,
    txtNoReminder,
    txtSomethingWentWrong,
  } = useLocale();

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetReminders(toast));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function renderReminders() {
    if (reminders.status === "Loading") {
      return <Skeleton count={4} height={50} />;
    }

    if (reminders.status === "Error") {
      return <p className="p-6 text-red-500">{txtSomethingWentWrong}</p>;
    }

    if (reminders.data.length === 0) {
      return <p className="p-6 text-muted-foreground">{txtNoReminder}</p>;
    }

    return reminders.data.map((reminder) => (
      <ReminderItem
        key={reminder.reminderId}
        title={reminder.title}
        description={reminder.description}
        timeReminder={reminder.timeReminder}
        createdAt={reminder.createdAt}
        updatedAt={reminder.updatedAt}
        onDelete={() =>
          dispatch(asyncDeleteReminder(reminder.reminderId, toast))
        }
      />
    ));
  }

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>{txtReminderList}</CardTitle>
        <CardDescription>{txtTodayReminder}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">{renderReminders()}</div>
      </CardContent>
      {needAddReminder && (
        <CardFooter>
          <AddNewReminderButton />
        </CardFooter>
      )}
    </Card>
  );
}
