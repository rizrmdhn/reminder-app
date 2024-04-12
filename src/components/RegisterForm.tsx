import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Eye, EyeOff } from "lucide-react";
import { asyncRegisterUser } from "@/states/authUser/action";

export default function RegisterForm() {
  const { toast } = useToast();
  const [type, setType] = useState<"text" | "password">("password");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
    },
  });

  function handleSubmit(data: z.infer<typeof registerSchema>) {
    dispatch(
      asyncRegisterUser(
        data.fullname,
        data.username,
        data.email,
        data.password,
        toast,
        navigate
      )
    );
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ml-1 font-bold">Fullname</FormLabel>
                  <FormControl>
                    <Input
                      type="fullname"
                      placeholder="Max Verstappen"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs">&nbsp;</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ml-1 font-bold">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      placeholder="maxverstappen"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs">&nbsp;</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ml-1 font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs">&nbsp;</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="ml-1 font-bold">Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        placeholder="Masukkan Password"
                        type={type}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant={"ghost"}
                        className="absolute right-2 top-0 p-0 hover:bg-transparent"
                        onClick={() => {
                          setType((prev) =>
                            prev === "password" ? "text" : "password"
                          );
                        }}
                      >
                        {type === "password" ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs">&nbsp;</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a
            className="underline hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
