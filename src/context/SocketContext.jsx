import { createContext, useContext, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";
import { useChat } from "./ChatContext";

const SocketContext = createContext(null);

export const useContextSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { user } = useAuth();
  const { selectedChatData, selectedChatType, addMessage } = useChat();

  const selectedChatDataRef = useRef(selectedChatData); // Ref for selectedChatData

  useEffect(() => {
    selectedChatDataRef.current = selectedChatData; // Sync the ref with the latest state
  }, [selectedChatData]);

  useEffect(() => {
    if (user) {
      socketRef.current = io("http://localhost:8080", {
        withCredentials: true,
        //in the backend we get the user id from the handshake with this step
        query: {
          userId: user.id,
        },
      });

      socketRef.current.on("connect", () => {
        console.log(
          user.id,
          "User connected to socket server with id:",
          socketRef.current.id
        );
      });

      const handleRecieveMessage = (message) => {
        console.log("Message received:", message);
        console.log("selectedChatData", selectedChatData);

        const chatData = selectedChatDataRef.current;

        console.log("chatData", chatData);
        

        if (
          selectedChatType !== undefined  &&
          (chatData.id === message.senderId ||
            chatData.id === message.recipientId)
        ) {
          console.log("Message received:", message);
        //   socketRef.current.emit("message", message);
          addMessage(message);
        }
      };
      socketRef.current.on("receiveMessage", handleRecieveMessage);

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
