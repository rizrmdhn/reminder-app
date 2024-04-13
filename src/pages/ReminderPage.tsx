import AddNewReminderButton from "@/components/AddNewReminderButton";
import DashboardReminderList from "@/components/DashboardReminderList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import MainLayout from "@/layout/MainLayout";
import { asyncGetTodos } from "@/states/todos/action";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function ReminderPage() {
  const authUser = useAppSelector((state) => state.authUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetTodos(toast));
  }, [dispatch]);

  return (
    <MainLayout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <AddNewReminderButton className="ml-auto w-fit" />
        <Card x-chunk="dashboard-06-chunk-0" className="w-full">
          <CardHeader>
            <CardTitle>
              {authUser.status === "Loading" ? (
                <Skeleton width={200} />
              ) : (
                `Welcome back, ${authUser.data?.fullname}`
              )}
            </CardTitle>
            <CardDescription>
              Welcome to your Reminder list. In this page you can see your most
              recent created reminders and create new ones.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-full">
              <DashboardReminderList />
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}
