/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { getUserInfo, loginUser, logoutUser, registerUser } from "../api/authApi";
import Loader from "../components/shared/Loader";
import { set } from "react-hook-form";

// Create a context to manage authentication-related data and functions
const AuthContext = createContext(null);

// with typescript
// const AuthContext = createContext<{
//   user: UserInterface | null;
//   token: string | null;
//   login: (data: { username: string; password: string }) => Promise<void>;
//   register: (data: {
//     email: string;
//     username: string;
//     password: string;
//   }) => Promise<void>;
//   logout: () => Promise<void>;
// }>({
//   user: null,
//   token: null,
//   login: async () => {},
//   register: async () => {},
//   logout: async () => {},
// });

// Create a hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

// Create a component that provides authentication-related data and functions
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Ref to prevent duplicate calls
  const initializeUserCalled = useRef(false);

  const initializeUser = async () => {
    try {
      const response = await getUserInfo();
      if (response.status === 200 && response.data.user?.id) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error initializing user:", error);
      setUser(null);
    } finally {
      setIsInitialized(true); // Mark initialization as complete
    }
  };

  useEffect(() => {
    // if (!initializeUserCalled.current) {
    //   initializeUserCalled.current = true; // Mark as called
    //   initializeUser();
    // }
    if(!user) {
      initializeUser();
    } else setIsInitialized(true);
  }, [user]);

  const register = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      console.log("Register response:", response);
      setUser(response.data.user); // Save user data in context
      return response;
    } catch (error) {
      console.log("AuthContext register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      console.log("Login response:", response);

      setUser(response.data.user); // Save user data in context
      return response;
    } catch (error) {
      console.log("AuthContext login error:", error);
      console.log("AuthContext login error response:", error.response);
      console.log("AuthContext login error message:", error.message);
      console.log("AuthContext login error request:", error.request);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.log("AuthContext logout error:", error);
      console.log("AuthContext logout error response:", error.response);
      console.log("AuthContext logout error message:", error.message);
      console.log("AuthContext logout error request:", error.request);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check for saved user and token in local storage during component initialization

  //   useEffect(() => {
  //     // setIsLoading(true);
  //     const _token = LocalStorage.get("access_token");
  //     const _user = LocalStorage.get("user");
  //     if (_token && _user?._id) {
  //       setUser(_user);
  //       setAccessToken(_token);
  //     }
  //     // setIsLoading(false);
  //   }, []);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, accessToken, register,setUser, logout }}>
      {/* {isLoading ? <Loader /> : children} */}
      {isLoading && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
