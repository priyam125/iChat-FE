import { createContext, useContext, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useContextSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            socketRef.current = io("http://localhost:8080", {
                withCredentials: true,
                //in the backend we get the user id from the handshake with this step
                query: {
                    userId: user.id,
                },
            })

            socketRef.current.on("connect", () => {
                console.log(user.id, "User connected to socket server with id:", socketRef.current.id);
            });

            return () => {
                socketRef.current.disconnect();
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};