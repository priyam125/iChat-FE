/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";
import Loader from "../components/shared/Loader";
import { set } from "react-hook-form";

// Create a context to manage authentication-related data and functions
const ChatContext = createContext(null);

// Create a hook to access the AuthContext
const useChat = () => useContext(ChatContext);

// Create a component that provides authentication-related data and functions
const ChatProvider = ({ children }) => {
  const [selectedChatType, setSelectedChatType] = useState(null);
  const [selectedChatData, setSelectedChatData] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const closeChat = () => {
    setSelectedChatType(null);
    setSelectedChatData(null);
    setSelectedChatMessages([]);
  };

  //   if (!isInitialized) {
  //     return <Loader />;
  //   }

  return (
    <ChatContext.Provider
      value={{
        selectedChatType,
        setSelectedChatType,
        selectedChatData,
        setSelectedChatData,
        selectedChatMessages,
        setSelectedChatMessages,
        closeChat,
      }}
    >
      {/* {isLoading ? <Loader /> : children} */}
      {/* {isLoading && <Loader />} */}
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider, useChat };
