import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const loggedIn = Boolean(localStorage.getItem("access"));
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}