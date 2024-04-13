import DashboardTodoList from "@/components/DashboardTodoList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useRedux";
import MainLayout from "@/layout/MainLayout";
import Skeleton from "react-loading-skeleton";

export default function TodoPage() {
  const authUser = useAppSelector((state) => state.authUser);

  return (
    <MainLayout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
              Welcome to your Todo list. In this page you can see your most
              recent created todos and create new ones.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-full">
              <DashboardTodoList needAddTodo />
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}