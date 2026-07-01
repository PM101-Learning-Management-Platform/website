import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SetGuest() {
  const authContext = useContext(AuthContext);
  const { user } = authContext || {};

  if (user?.role === "student") {
    return <Navigate to="/student" replace />;
  }

  return <Outlet />;
}
