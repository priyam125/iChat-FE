import { FiEdit } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getColor } from "../../lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { IoLogOut, IoPowerSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const ProfileInfo = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again later.");
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex items-center justify-center gap-3">
        <div className="w-12 h-12 relative ">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {user.image ? (
              <AvatarImage
                src={user.image}
                alt="profile"
                className="w-full h-full object-cover bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 flex items-center justify-center text-lg border-[1px] rounded-full ${getColor(
                  user.color
                )}`}
              >
                {user.firstName
                  ? user.firstName.split("").shift()
                  : user.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.email}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <FiEdit className="text-purple-500 text-xl font-medium" onClick={() => navigate('/profile')}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <IoPowerSharp className="text-red-500 text-xl font-medium" onClick={handleLogout}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
