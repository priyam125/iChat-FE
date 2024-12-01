import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useChat } from "../../context/ChatContext";
import { Avatar, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { getColor } from "../../lib/utils";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useChat();

  console.log("selectedChatData", selectedChatData);
  console.log("selectedChatType", selectedChatType);

  const [image, setImage] = useState(null);
  const getImage = async () => {
    if (selectedChatData.image) {
      try {
        const response = await axios.get(
          `http://localhost:8080/${selectedChatData.image}`,
          {
            responseType: "blob", // Fetch the image as a Blob
          }
        );

        const url = URL.createObjectURL(response.data);
        setImage(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  };

  useEffect(() => {
    getImage();
  }, [selectedChatData.image]);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex gap-3 items-center justify-center w-full ">
          <div className="w-12 h-12 relative ">
            <Avatar className="w-12 h-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 flex items-center justify-center text-lg border-[1px] rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatType === "contact" && selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatType === "contact" &&
                      !selectedChatData.firstName
                    ? selectedChatData.email.split("").shift()
                    : selectedChatData.name.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatType === "contact" && !selectedChatData.firstName ? `${selectedChatData.email}` : selectedChatData.name}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transaition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
