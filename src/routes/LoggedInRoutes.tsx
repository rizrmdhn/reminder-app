import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ReminderPage from "@/pages/ReminderPage";
import SettingsPage from "@/pages/SettingsPage";
import TodoPage from "@/pages/TodoPage";
import { Route, Routes } from "react-router-dom";

export default function LoggedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/reminder" element={<ReminderPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
