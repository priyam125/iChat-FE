import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const {user} = useAuth();
  console.log("privateAuth", user);

  const isAuthenticated = !!user;
  console.log("isAuthenticated", isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
