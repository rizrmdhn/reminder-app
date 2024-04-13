// Redux imports
import { ThunkDispatch, configureStore } from "@reduxjs/toolkit"
import authUserReducer from "./authUser/reducer"
import isPreloadReducer from "./isPreload/reducer"
import isAddNewTodoReducer from "./isAddNewTodo/reducer"
import todoReducer from "./todos/reducer"

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    isAddNewTodo: isAddNewTodoReducer,
    todos: todoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, { type: string } & Record<string, unknown>>
export type AppGetState = typeof store.getState
