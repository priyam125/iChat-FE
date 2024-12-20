import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import { getAllMessages } from "../../api/messagesApi";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatData, selectedChatType, selectedChatMessages, setSelectedChatMessages } =
    useChat();
  const { user } = useAuth();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  useEffect(() => {

    const getMessages = async () => {
      try {
        const response = await getAllMessages({id:selectedChatData.id});

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(selectedChatData.id) {
      if(selectedChatType === "contact") getMessages()
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message, index) => {
      // const isOwnMessage = message.sender.id === user.id;
      // const isSameSender = message.sender.id === message.recipient.id;
      // const isSameDate = message.createdAt.slice(0, 10) === lastDate;

      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-1">
              {moment(message.timestamp).format("LL")}
            </div>
          )}

          {selectedChatType === "contact" && renderDmMessages(message)}
        </div>
      );
    });
  };

  const renderDmMessages = (message) => {
    console.log("message", message);
    
    return (
    <div className={`${message.senderId === selectedChatData.id ? "text-left" : "text-right"}`}>
      {message.messageType === "text" && (
        <div
        className={`${
          message.senderId !== user.id
            ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
            : "bg-[#2a2b33]/5 text-white/80 border-white/20"
        } border inline-block py-2 px-4 rounded my-1 max-w-1/2 break-words}`}
      >
        {message.content}
      </div>
      )}
      <div className="text-xs text-gray-600 ">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  )};

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
