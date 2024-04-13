import HomePage from "@/pages/HomePage"
import NotFoundPage from "@/pages/NotFoundPage"
import SettingsPage from "@/pages/SettingsPage"
import TodoPage from "@/pages/TodoPage"
import { Route, Routes } from "react-router-dom"

export default function LoggedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
