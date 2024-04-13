import { createNewTodoSchema } from "@/schema/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { asyncCreateTodo } from "@/states/todos/action";
import { useToast } from "./ui/use-toast";
import useLocale from "@/hooks/useLocale";

export default function NewTodoForm() {
  const {
    txtTaskTitle,
    txtTaskTitlePlaceholder,
    txtTaskDescription,
    txtTaskDescriptionPlaceholder,
    txtCreateTodo,
  } = useLocale();

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof createNewTodoSchema>>({
    resolver: zodResolver(createNewTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function handleSubmit(data: z.infer<typeof createNewTodoSchema>) {
    dispatch(asyncCreateTodo(data.title, data.description, toast));
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="ml-1 font-bold">{txtTaskTitle}</FormLabel>
                <FormControl>
                  <Input
                    type="title"
                    placeholder={txtTaskTitlePlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs">&nbsp;</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="ml-1 font-bold">
                  {txtTaskDescription}
                </FormLabel>
                <FormControl className="relative">
                  <div>
                    <Input
                      placeholder={txtTaskDescriptionPlaceholder}
                      type="text"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs">&nbsp;</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {txtCreateTodo}
          </Button>
        </form>
      </Form>
    </>
  );
}
