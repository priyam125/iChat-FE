import  { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie-json.json";

import { FaPlus } from "react-icons/fa";
import { searchContactsApi } from "../../api/contactsApi";
import ContactCard from "./ContactCard";

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    console.log("searchTerm", searchTerm);
    
    try {
      if (searchTerm.length > 0) {
        const response = await searchContactsApi(searchTerm);
        setSearchedContacts(response.data.contacts);
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
    }
  };

  useEffect(() => {
    console.log("searchedContacts", searchedContacts);
    
  })

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-start text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contact"
              className="rounded-lg p-6 border-none bg-[#2c2e3b]"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} setOpenNewContactModal={setOpenNewContactModal} setSearchedContacts={setSearchedContacts}/>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:flex flex-col mt-5 justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={{ loop: true, autoplay: true, animationData }}
              />
              <div className="text-opacity-80 text-white text-xl lg:text-2xl transition-all duration-200 font-medium flex flex-col items-center gap-5 mt-5 text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span> Search new
                  <span className="text-purple-500"> Contact.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
