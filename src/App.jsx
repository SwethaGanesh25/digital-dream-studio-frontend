import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import YearsPage from "./pages/YearsPage";
import MonthsPage from "./pages/MonthsPage";
import CalendarPage from "./pages/CalendarPage";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/years" replace />} />
          <Route path="/years" element={<YearsPage />} />
          <Route path="/years/:year" element={<MonthsPage />} />
          <Route path="/years/:year/:month" element={<CalendarPage />} />
        </Route>
      </Route>
    </Routes>
  );
}