import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie-json.json"; 

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={{ loop: true, autoplay: true, animationData }}
      />
      <div className="text-opacity-80 text-white text-3xl lg:text-4xl transition-all duration-200 font-medium flex flex-col items-center gap-5 mt-10 text-center">
        <h3 className="poppins-medium">
            Hi<span className="text-purple-500">!</span> Welcome to <span className="text-purple-500">i</span>Chat App
            <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
