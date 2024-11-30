/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { Avatar, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { getColor } from "../../lib/utils";

const ContactListCard = ({contact, isChannel}) => {

  const {
    selectedChatType,
    setSelectedChatType,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useChat();

  const [image, setImage] = useState(null);

  const getImage = async () => {
    if (contact.image) {
      try {
        const response = await axios.get(
          `http://localhost:8080/${contact.image}`,
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
  }, []);

  const handleClick = (contact) => {
    setSelectedChatType(isChannel ? "channel" : "contact");
    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData.id === contact.id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div
      className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
        selectedChatData && contact.id === selectedChatData.id
          ? "bg-[#8417ff] hover:bg-[#8417ff]/90"
          : "hover:bg-[#f1f1f1]/10"
      }`}
      key={contact.id}
      onClick={() => handleClick(contact)} 
    >
      <div className="flex items-center gap-5 justify-start text-neutral-300 ">
        {!isChannel && (
          <Avatar className="w-10 h-10 rounded-full overflow-hidden">
            {contact.image ? (
              <AvatarImage
                src={image}
                alt="profile"
                className="w-full h-full object-cover bg-black"
              />
            ) : (
              <div
                className={`${selectedChatData && contact.id === selectedChatData.id ? "bg-[#ffffff22] border-2 border-white/50" : getColor(contact.color) } uppercase h-10 w-10 flex items-center justify-center text-lg border-[1px] rounded-full`}
              >
                {contact.firstName
                  ? contact.firstName.split("").shift()
                  : contact.email.split("").shift()}
              </div>
            )}
          </Avatar>
        )}

        {
          isChannel && <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">#</div>
        }
        {
            isChannel ? <span>{contact.name}</span> : <span>{contact.firstName} {contact.lastName}</span>
        }
      </div>
    </div>
  );
};

export default ContactListCard;
