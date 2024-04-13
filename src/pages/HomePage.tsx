import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import MainLayout from "@/layout/MainLayout";
import { useAppSelector } from "@/hooks/useRedux";
import DashboardTodoList from "@/components/DashboardTodoList";
import DashboardReminderList from "@/components/DashboardReminderList";
import useLocale from "@/hooks/useLocale";

export default function HomePage() {
  const authUser = useAppSelector((state) => state.authUser);

  const { txtWelcomeBack, txtWelcomeBackDashboards } = useLocale();

  return (
    <MainLayout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>
              {authUser.status === "Loading" ? (
                <Skeleton width={200} />
              ) : (
                `${txtWelcomeBack} ${authUser.data!.fullname}!`
              )}
            </CardTitle>
            <CardDescription>{txtWelcomeBackDashboards}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <DashboardTodoList />
              <DashboardReminderList />
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}
