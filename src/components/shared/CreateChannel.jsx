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
import { Button } from "../ui/button";
import MultipleSelector  from "../ui/multipleselect";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie-json.json";

import { FaPlus } from "react-icons/fa";
import { getAllContactsApi, searchContactsApi } from "../../api/contactsApi";
import ContactCard from "./ContactCard";
import { set } from "react-hook-form";
import { useChat } from "../../context/ChatContext";
import { createChannelApi } from "../../api/channelsApi";

const CreateChannel = () => {
  const [ openNewChannelModal, setOpenNewChannelModal ] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  const {addChannel} = useChat();

  useEffect(() => {
    const getData = async () => {
        const response = await getAllContactsApi();

        setAllContacts(response.data.contacts);
    }

    getData();
  }, [])

  const createChannel = async () => {
    console.log("selectedContacts", selectedContacts);
    console.log("channelName", channelName);

    try {
        if(channelName.length > 0 && selectedContacts.length > 0) {
            const response = await createChannelApi({
                name: channelName,
                members: selectedContacts.map((contact) => contact.value)
            })

            if(response.status === 201) {
                setOpenNewChannelModal(false);
                setSelectedContacts([]);
                setChannelName("");
                addChannel(response.data.channel);
            }
        }  
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-start text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewChannelModal} onOpenChange={setOpenNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please fill up the details for the channel</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 border-none bg-[#2c2e3b]"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"  
              defaultOptions={allContacts}
              placeholder="Select contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={<p className="text-center text-lg text-gray-600 leading-10">No results found</p>}
            />
          </div>
          <div>
            <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={createChannel}>
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
