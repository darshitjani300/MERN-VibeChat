import React from "react";
import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  if (isAuthenticated()) {
    return <Navigate to={"/home"} replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
