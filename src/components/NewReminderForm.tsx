import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useToast } from "./ui/use-toast";
import { createReminderSchema } from "@/schema/reminder";
import { asyncCreateReminder } from "@/states/reminder/action";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import moment from "moment";
import "moment/locale/id";

export default function NewReminderForm() {
  const todo = useAppSelector((state) => state.todos);

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof createReminderSchema>>({
    resolver: zodResolver(createReminderSchema),
    defaultValues: {
      idTodo: "",
      title: "",
      description: "",
      timeReminder: new Date(),
    },
  });

  function handleSubmit(data: z.infer<typeof createReminderSchema>) {
    dispatch(
      asyncCreateReminder(
        data.idTodo,
        data.title,
        data.description,
        data.timeReminder.toISOString(),
        toast,
      ),
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="idTodo"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="ml-1 font-bold">Todo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {todo.data.length === 0 ? (
                      <SelectGroup>
                        <SelectItem disabled value="">
                          No todo found
                        </SelectItem>
                      </SelectGroup>
                    ) : (
                      todo.data.map((todo) => (
                        <SelectGroup key={todo.todoId}>
                          <SelectItem value={todo.todoId}>
                            {todo.title}
                          </SelectItem>
                        </SelectGroup>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your todo to create a new reminder
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="ml-1 font-bold">Title</FormLabel>
                <FormControl>
                  <Input
                    type="title"
                    placeholder="Enter your title here"
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
                <FormLabel className="ml-1 font-bold">Description</FormLabel>
                <FormControl className="relative">
                  <div>
                    <Input
                      placeholder="Enter your description here"
                      type="text"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs">&nbsp;</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeReminder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pr-4">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          `${moment(field.value).format("dddd, DD MMMM YYYY HH:mm")}`
                        ) : (
                          <span>Select Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      className="p-0"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                    <Input
                      type="time"
                      className="mt-2"
                      // take locale date time string in format that the input expects (24hr time)
                      value={field.value.toLocaleTimeString([], {
                        hourCycle: "h23",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      // take hours and minutes and update our Date object then change date object to our new value
                      onChange={(selectedTime) => {
                        const currentTime = field.value;
                        currentTime.setHours(
                          parseInt(selectedTime.target.value.split(":")[0]),
                          parseInt(selectedTime.target.value.split(":")[1]),
                          0,
                        );
                        field.onChange(currentTime);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <FormDescription>
                  This is the date & time the assessment finished.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create new task
          </Button>
        </form>
      </Form>
    </>
  );
}
