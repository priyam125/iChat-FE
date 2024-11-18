import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import PrivateRoute from "./components/shared/PrivateRoute";
import AuthRoute from "./components/shared/AuthRoute";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/shared/Loader";
import { getUserInfo } from "./api/authApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {user, setUser} = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response  = await getUserInfo();
      console.log(response);
      setIsLoading(false);
      if(response.status === 200 && response.data.user) {
        setUser(response.data.user);
      } else setUser(undefined);
    } catch (error) {
      setUser(undefined);
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // if(!user) {
    //   getUserData();
    // } 
  }, [])

  if(isLoading) {
    return <Loader />
  }
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* // Catch-all route: render Auth component for any unmatched URL paths */}
        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
