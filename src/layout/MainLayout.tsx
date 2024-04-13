import React from "react";
import {
  Bell,
  Home,
  ListChecks,
  ListTodo,
  PanelLeft,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { asyncUnsetAuthUser } from "@/states/authUser/action";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = useAppSelector((state) => state.authUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function isActiveDesktop(bool: boolean) {
    return bool
      ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
      : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  }

  function isActiveMobile(bool: boolean) {
    return bool
      ? "flex items-center gap-4 px-2.5 text-foreground"
      : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <a
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <ListChecks className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Reminder App</span>
            </a>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  onClick={() => navigate("/")}
                  className={isActiveDesktop(location.pathname === "/")}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  onClick={() => navigate("/todo")}
                  className={isActiveDesktop(location.pathname === "/todo")}
                >
                  <ListTodo className="h-5 w-5" />
                  <span className="sr-only">Todo</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Todo</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  onClick={() => navigate("/reminder")}
                  className={isActiveDesktop(location.pathname === "/reminder")}
                >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Reminder</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Reminder</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  onClick={() => navigate("/settings")}
                  className={isActiveDesktop(location.pathname === "/settings")}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <ListChecks className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Reminder App</span>
                  </a>
                  <a
                    onClick={() => navigate("/")}
                    className={isActiveMobile(location.pathname === "/")}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </a>
                  <a
                    onClick={() => navigate("/todo")}
                    className={isActiveMobile(location.pathname === "/todo")}
                  >
                    <ListTodo className="h-5 w-5" />
                    Todo
                  </a>
                  <a
                    onClick={() => navigate("/reminder")}
                    className={isActiveMobile(
                      location.pathname === "/reminder",
                    )}
                  >
                    <Bell className="h-5 w-5" />
                    Reminder
                  </a>
                  <a
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-auto hover:cursor-pointer">
                  <AvatarImage src={authUser.data?.avatar_url} />
                  <AvatarFallback>
                    <span>
                      {authUser.data?.fullname.charAt(0).toLocaleUpperCase()}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => dispatch(asyncUnsetAuthUser(navigate))}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}
