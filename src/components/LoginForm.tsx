import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useRedux";
import { loginSchema } from "@/schema/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Eye, EyeOff } from "lucide-react";
import { asyncSetAuthUser } from "@/states/authUser/action";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import useLocale from "@/hooks/useLocale";

export default function LoginForm() {
  const {
    txtEmail,
    txtEmailPlaceholder,
    txtPassword,
    txtPasswordPlaceholder,
    txtLogin,
    txtLoginDesc,
    txtDontHaveAccount,
    txtSignUp,
  } = useLocale();

  const { toast } = useToast();
  const [type, setType] = useState<"text" | "password">("password");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(data: z.infer<typeof loginSchema>) {
    dispatch(asyncSetAuthUser(data.email, data.password, toast));
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{txtLogin}</CardTitle>
        <CardDescription>{txtLoginDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
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
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {txtDontHaveAccount}{" "}
          <a
            className="underline hover:cursor-pointer"
            onClick={() => {
              navigate("/register");
            }}
          >
            {txtSignUp}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
