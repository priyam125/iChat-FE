import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const {user} = useAuth();
  console.log("privateAuth", user);
  const navigate = useNavigate();

  const isAuthenticated = !!user;
  console.log("isAuthenticated", isAuthenticated);
  
  return isAuthenticated ? children : Navigate({ to: "/auth" });
};

export default PrivateRoute;
