import { z } from "zod"

export const createReminderSchema = z.object({
  idTodo: z.string().min(3, {
    message: "Todo is required",
  }),
  title: z.string().min(3, {
    message: "Title is too short (minimum is 3 characters)",
  }),
  description: z.string().min(3, {
    message: "Description is too short (minimum is 3 characters)",
  }),
  timeReminder: z.string().min(3, {
    message: "Time is required",
  }),
})

export const updateReminderSchema = z.object({
  idTodo: z.string().min(3, {
    message: "Todo is required",
  }),
  title: z.string().min(3, {
    message: "Title is too short (minimum is 3 characters)",
  }),
  description: z.string().min(3, {
    message: "Description is too short (minimum is 3 characters)",
  }),
  timeReminder: z
    .string()
    .min(3, {
      message: "Time is required",
    })
    .optional(),
})
