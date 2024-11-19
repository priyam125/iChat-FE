import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const {user} = useAuth();
  // console.log("userAuth", user);

  const isAuthenticated = !!user;
  // console.log("isAuthenticated", isAuthenticated);
  
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

export default AuthRoute;
