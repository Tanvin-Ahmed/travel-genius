import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { User } from "../../types";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const str = localStorage.getItem("auth-data")?.trim();
  let auth;
  if (str) {
    auth = JSON.parse(str) as User;
  }

  return auth?.token || auth?.email || auth?.uid ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
