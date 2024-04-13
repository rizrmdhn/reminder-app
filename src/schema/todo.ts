import { z } from "zod"

export const createNewTodoSchema = z.object({
  title: z.string().min(3, {
    message: "Title is too short (minimum is 3 characters)",
  }),
  description: z.string().min(3, {
    message: "Description is too short (minimum is 3 characters)",
  }),
})

export const updateTodoSchema = z.object({
  title: z.string().min(3, {
    message: "Title is too short (minimum is 3 characters)",
  }),
  description: z.string().min(3, {
    message: "Description is too short (minimum is 3 characters)",
  }),
})
