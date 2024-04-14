import env from "@/schema/env";
import { Reminder } from "@/types/reminder";
import {
  CreateReminderResponse,
  CreateTodoResponse,
  GetMeResponse,
  GetReminderListResponse,
  GetReminderResponse,
  GetTodoListResponse,
  GetTodoResponse,
  LoginResponse,
  RegisterResponse,
  UpdateReminderResponse,
  UpdateTodoResponse,
} from "@/types/response";
import { Todo } from "@/types/todo";
import { User } from "@/types/user";
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = env.VITE_API_URL;

const localStorageKey = "__reminder_app_token__";
const localStorageKeyTheme = "__reminder_app_theme__";
const localStorageKeyLocale = "__reminder_app_locale__";

async function fetchWithAuth(url: string, options: AxiosRequestConfig = {}) {
  return axios(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorageFunctions.getToken()}`,
    },
  });
}

const localStorageFunctions = (() => {
  function getToken() {
    return localStorage.getItem(localStorageKey);
  }

  function setToken(token: string) {
    localStorage.setItem(localStorageKey, token);
  }

  function removeToken() {
    localStorage.removeItem(localStorageKey);
  }

  function getTheme() {
    return localStorage.getItem(localStorageKeyTheme);
  }

  function setTheme(theme: string) {
    localStorage.setItem(localStorageKeyTheme, theme);
  }

  function getLocale() {
    return localStorage.getItem(localStorageKeyLocale);
  }

  function setLocale(locale: string) {
    localStorage.setItem(localStorageKeyLocale, locale);
  }

  return {
    getToken,
    setToken,
    removeToken,
    getTheme,
    setTheme,
    getLocale,
    setLocale,
  };
})();

const auth = (() => {
  async function login(email: string, password: string) {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });

    const { meta } = response.data as LoginResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const {
      data: { token },
    } = response.data as LoginResponse;

    localStorageFunctions.setToken(token);
  }

  async function register(
    fullname: string,
    username: string,
    email: string,
    password: string,
  ) {
    const response = await axios.post(`${baseUrl}/register`, {
      fullname,
      username,
      email,
      password,
    });

    const { meta } = response.data as RegisterResponse;

    if (meta.status !== 201 || meta.message !== "Success") {
      throw new Error(meta.message);
    }
  }

  async function logout() {
    localStorageFunctions.removeToken();
  }

  async function getMe(): Promise<User> {
    const response = await fetchWithAuth(`${baseUrl}/users/me`);

    const { meta } = response.data as GetMeResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as GetMeResponse;

    return data;
  }

  return {
    login,
    register,
    logout,
    getMe,
  };
})();

const todos = (() => {
  async function getTodoList(): Promise<Todo[]> {
    const response = await fetchWithAuth(`${baseUrl}/todos`);

    const { meta } = response.data as GetTodoListResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as GetTodoListResponse;

    return data;
  }

  async function createTodo(title: string, description: string): Promise<Todo> {
    const response = await fetchWithAuth(`${baseUrl}/todos`, {
      method: "POST",
      data: {
        title,
        description,
      },
    });

    const { meta } = response.data as CreateTodoResponse;

    if (meta.status !== 201 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as CreateTodoResponse;

    return data;
  }

  async function getTodoDetail(id: string): Promise<Todo> {
    const response = await fetchWithAuth(`${baseUrl}/todos/${id}`);

    const { meta } = response.data as GetTodoResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as GetTodoResponse;

    return data;
  }

  async function updateTodo(
    id: string,
    title: string,
    description: string,
  ): Promise<Todo> {
    const response = await fetchWithAuth(`${baseUrl}/todos/${id}`, {
      method: "PUT",
      data: {
        title,
        description,
      },
    });

    const { meta } = response.data as UpdateTodoResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as UpdateTodoResponse;

    return data;
  }

  async function deleteTodo(id: string) {
    const response = await fetchWithAuth(`${baseUrl}/todos/${id}`, {
      method: "DELETE",
    });

    const { meta } = response.data as UpdateTodoResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }
  }

  return {
    getTodoList,
    createTodo,
    getTodoDetail,
    updateTodo,
    deleteTodo,
  };
})();

const reminders = (() => {
  async function getReminderList(): Promise<Reminder[]> {
    const response = await fetchWithAuth(`${baseUrl}/reminders`);

    const { meta } = response.data as GetReminderListResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as GetReminderListResponse;

    return data;
  }

  async function createReminder(
    idTodo: string,
    title: string,
    description: string,
    timeReminder: string,
  ): Promise<Reminder> {
    const response = await fetchWithAuth(`${baseUrl}/reminders`, {
      method: "POST",
      data: {
        idTodo,
        title,
        description,
        timeReminder,
      },
    });

    const { meta } = response.data as CreateReminderResponse;

    if (meta.status !== 201 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as CreateReminderResponse;

    return data;
  }

  async function getReminderDetail(id: string): Promise<Reminder> {
    const response = await fetchWithAuth(`${baseUrl}/reminders/${id}`);

    const { meta } = response.data as GetReminderResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as GetReminderResponse;

    return data;
  }

  async function updateReminder(
    id: string,
    title: string,
    description: string,
    timeReminder: string,
  ): Promise<Reminder> {
    const response = await fetchWithAuth(`${baseUrl}/reminders/${id}`, {
      method: "PUT",
      data: {
        title,
        description,
        timeReminder,
      },
    });

    const { meta } = response.data as UpdateReminderResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }

    const { data } = response.data as UpdateReminderResponse;

    return data;
  }

  async function deleteReminder(id: string) {
    const response = await fetchWithAuth(`${baseUrl}/reminders/${id}`, {
      method: "DELETE",
    });

    const { meta } = response.data as UpdateReminderResponse;

    if (meta.status !== 200 || meta.message !== "Success") {
      throw new Error(meta.message);
    }
  }

  return {
    getReminderList,
    createReminder,
    getReminderDetail,
    updateReminder,
    deleteReminder,
  };
})();

export { localStorageFunctions, auth, todos, reminders };
