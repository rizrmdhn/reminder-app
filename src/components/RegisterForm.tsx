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
import useLocale from "@/hooks/useLocale";

export default function RegisterForm() {
  const {
    txtEmail,
    txtEmailPlaceholder,
    txtPassword,
    txtPasswordPlaceholder,
    txtLogin,
    txtAlreadyHaveAccount,
    txtSignUp,
    txtSignUpDesc,
    txtFullName,
    txtFullNamePlaceholder,
    txtUsername,
    txtUsernamePlaceholder,
  } = useLocale();

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
        navigate,
      ),
    );
  }

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl">{txtSignUp}</CardTitle>
        <CardDescription>{txtSignUpDesc}</CardDescription>
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
                  <FormLabel className="ml-1 font-bold">
                    {txtFullName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="fullname"
                      placeholder={txtFullNamePlaceholder}
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
                  <FormLabel className="ml-1 font-bold">
                    {txtUsername}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      placeholder={txtUsernamePlaceholder}
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
                  <FormLabel className="ml-1 font-bold">{txtEmail}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={txtEmailPlaceholder}
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
                  <FormLabel className="ml-1 font-bold">
                    {txtPassword}
                  </FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        placeholder={txtPasswordPlaceholder}
                        type={type}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant={"ghost"}
                        className="absolute right-2 top-0 p-0 hover:bg-transparent"
                        onClick={() => {
                          setType((prev) =>
                            prev === "password" ? "text" : "password",
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
              {txtSignUp}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {txtAlreadyHaveAccount}{" "}
          <a
            className="underline hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            {txtLogin}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
