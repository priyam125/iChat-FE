import React, { useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { useState } from "react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSearch, IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
const MessageBar = () => {
  const emojiRef = React.createRef();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          placeholder="Enter Message"
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transaition-all"
        >
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            type="submit"
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transaition-all"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              //   ref={emojiRef}
              theme="dark"
              open={emojiPickerOpen}
              autoFocusSearch={false}
              onEmojiClick={handleAddEmoji}
              //   searchIcon={<IoSearch className="text-2xl" />}
              //   previewConfig={{ showPreview: false }}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transaition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
