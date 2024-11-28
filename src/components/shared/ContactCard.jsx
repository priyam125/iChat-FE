import axios from "axios";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { getColor } from "../../lib/utils";
import { useChat } from "../../context/ChatContext";

/* eslint-disable react/prop-types */
const ContactCard = ({contact, setOpenNewContactModal, setSearchedContacts}) => {

    const {setSelectedChatType, setSelectedChatData} = useChat()

    const [image, setImage] = useState(null);
    const getImage = async () => {
        if(contact.image){
            try {
                const response = await axios.get(`http://localhost:8080/${contact.image}`, {
                    responseType: "blob", // Fetch the image as a Blob
                  });
                
                  const url = URL.createObjectURL(response.data);
                  setImage(url);
              } catch (error) {
                console.error("Error fetching image:", error);
              }
            return contact.image
        }
    }

    useEffect(() => {
        getImage()
    }, [contact.image])

    const selectNewContact = () => {
        console.log("contact", contact);
        setSelectedChatType("contact")
        setSelectedChatData(contact)

        setOpenNewContactModal(false)
        setSearchedContacts([])
    }

  return (
    <div className="flex gap-3 items-center cursor-pointer" onClick={selectNewContact}>
      <div className="w-12 h-12 relative ">
        <Avatar className="w-12 h-12 rounded-full overflow-hidden">
          {contact.image ? (
            <AvatarImage
              src={image && image}
              alt="profile"
              className="w-full h-full object-cover bg-black"
            />
          ) : (
            <div
              className={`uppercase h-12 w-12 flex items-center justify-center text-lg border-[1px] rounded-full ${getColor(
                contact.color
              )}`}
            >
              {contact.firstName
                ? contact.firstName.split("").shift()
                : contact.email.split("").shift()}
            </div>
          )}
        </Avatar>
      </div>
      <div className="flex flex-col">
        <span>
          {contact.firstName && contact.lastName
            ? `${contact.firstName} ${contact.lastName}`
            : contact.email}
        </span>
        <span className="text-xs">{contact.email}</span>
      </div>
    </div>
  );
};

export default ContactCard;
