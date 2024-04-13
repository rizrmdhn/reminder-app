import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Skeleton from "react-loading-skeleton"
import MainLayout from "@/layout/MainLayout"
import { useAppSelector } from "@/hooks/useRedux"
import DashboardTodoList from "@/components/DashboardTodoList"
import DashboardReminderList from "@/components/DashboardReminderList"

export default function HomePage() {
  const authUser = useAppSelector((state) => state.authUser)

  return (
    <MainLayout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>
              {authUser.status === "Loading" ? <Skeleton width={200} /> : `Welcome back, ${authUser.data?.fullname}`}
            </CardTitle>
            <CardDescription>
              Welcome back to your dashboard. Here's a quick list of your most recent created todos and reminders.
            </CardDescription>
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
  )
}
