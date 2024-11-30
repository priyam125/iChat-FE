/* eslint-disable react/prop-types */
import { useChat } from "../../context/ChatContext";
import { Avatar, AvatarImage } from "../ui/avatar";
import ContactListCard from "./ContactListCard";

const ContactList = ({ contacts, isChannel = false }) => {
    console.log("contacts", contacts);
    
    return (
        <div className="mt-5">
          {contacts.length === 0 ? (
            <p className="text-center text-neutral-500">No contacts found</p>
          ) : (
            contacts.map((contact) => (
              <ContactListCard 
                key={contact.id}
                contact={contact}
                isChannel={isChannel}
              />
            ))
          )}
        </div>
      );
};

export default ContactList;
