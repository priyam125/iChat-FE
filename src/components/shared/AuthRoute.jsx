import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const {user} = useAuth();
  console.log("userAuth", user);
  const navigate = useNavigate();

  const isAuthenticated = !!user;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

export default AuthRoute;
