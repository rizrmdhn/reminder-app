import HomePage from "@/pages/HomePage";
import { Route, Routes } from "react-router-dom";

export default function LoggedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
