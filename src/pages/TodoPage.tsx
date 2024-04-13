import AddNewTodoButton from "@/components/AddNewTodoButton";
import DashboardTodoList from "@/components/DashboardTodoList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLocale from "@/hooks/useLocale";
import { useAppSelector } from "@/hooks/useRedux";
import MainLayout from "@/layout/MainLayout";
import Skeleton from "react-loading-skeleton";

export default function TodoPage() {
  const authUser = useAppSelector((state) => state.authUser);

  const { txtWelcomeBack, txtWelcomeTodo } = useLocale();

  return (
    <MainLayout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <AddNewTodoButton className="ml-auto w-fit" />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {authUser.status === "Loading" ? (
                <Skeleton width={200} />
              ) : (
                `${txtWelcomeBack} ${authUser.data!.fullname}!`
              )}
            </CardTitle>
            <CardDescription>{txtWelcomeTodo}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-full">
              <DashboardTodoList />
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
}
