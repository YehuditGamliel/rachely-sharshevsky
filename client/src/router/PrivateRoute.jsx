import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/AuthProvider.jsx";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/loginManager" />;
  return <Outlet />;
};

export default PrivateRoute;