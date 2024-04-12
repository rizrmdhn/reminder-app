import { Reminder } from "./reminder";
import { Todo } from "./todo";
import { User } from "./user";

export type Meta = {
  status: number;
  message: string;
};

export type SchemaError = {
  rule: string;
  field: string;
  message: string;
};

export type ErrorResponse = {
  meta: Meta;
};

export type SchemaErrorResponse = {
  errors: SchemaError[];
};

export type LoginResponse = {
  meta: Meta;
  data: {
    type: string;
    token: string;
  };
};

export type RegisterResponse = {
  meta: Meta;
  data: User;
};

export type GetMeResponse = {
  meta: Meta;
  data: User;
};

export type GetTodoListResponse = {
  meta: Meta;
  data: Todo[];
};

export type GetTodoResponse = {
  meta: Meta;
  data: Todo;
};

export type CreateTodoResponse = {
  meta: Meta;
  data: Todo;
};

export type UpdateTodoResponse = {
  meta: Meta;
  data: Todo;
};

export type DeleteTodoResponse = {
  meta: Meta;
};

export type GetReminderListResponse = {
  meta: Meta;
  data: Reminder[];
};

export type GetReminderResponse = {
  meta: Meta;
  data: Reminder;
};

export type CreateReminderResponse = {
  meta: Meta;
  data: Reminder;
};

export type UpdateReminderResponse = {
  meta: Meta;
  data: Reminder;
};

export type DeleteReminderResponse = {
  meta: Meta;
};
