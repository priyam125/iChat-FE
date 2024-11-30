/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useContext,
  useState,
} from "react";

// Create a context to manage authentication-related data and functions
const ChatContext = createContext(null);

// Create a hook to access the AuthContext
const useChat = () => useContext(ChatContext);

// Create a component that provides authentication-related data and functions
const ChatProvider = ({ children }) => {
  const [selectedChatType, setSelectedChatType] = useState(null);
  const [selectedChatData, setSelectedChatData] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [directMessagesContacts, setDirectMessagesContacts] = useState([]);

  const closeChat = () => {
    setSelectedChatType(null);
    setSelectedChatData(null);
    setSelectedChatMessages([]);
  };

  const addMessage = (message) => {
    setSelectedChatMessages((prevMessages) => [
      ...prevMessages,
      {
        ...message,
        recipient:
          selectedChatType === "channel"
            ? message.recipient
            : message.recipient.id,
        sender:
          selectedChatType === "channel"
            ? message.sender
            : message.sender.id,
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChatType,
        setSelectedChatType,
        selectedChatData,
        setSelectedChatData,
        selectedChatMessages,
        setSelectedChatMessages,
        directMessagesContacts,
        setDirectMessagesContacts,
        closeChat,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider, useChat };
