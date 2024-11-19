import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  Avatar,
  AvatarImage,
} from "../../components/ui/avatar";
import { colors, getColor } from "../../lib/utils";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { updateProfile } from "../../api/profileApi";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { user,setUser } = useAuth();
  const [hovered, setHovered] = React.useState(false);

  const [image, setImage] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState(0);

  const navigate = useNavigate();

  const handleProfileSubmit = async (data) => {
    try {
      console.log(data);

      const profileData = {
        firstName: data.firstName,
        lastName: data.lastName,
        color: selectedColor,
      };
      console.log(profileData);

      const response = await updateProfile(profileData);
      setUser(response.data.user);
      toast.success("Profile updated successfully");
      navigate("/chat");

      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   //ok now i want to poulate the email, firstame and last name with the user data
  //   if(user.profileSetup) {
  //     setValue("email", user.email);
  //     setValue("firstName", user.firstName);
  //     setValue("lastName", user.lastName);
  //     setSelectedColor(user.color);
  //   } else setValue("email", user.email);
  // }, [user, setValue]);

  useEffect(() => {
    if (user.profileSetup) {
      reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      setSelectedColor(user.color);
    }
  }, [user, reset]);

  const handleNavigate = () => {
    if(user.profileSetup) {
      // navigate(-1);
      navigate("/chat");
    } else toast.error("Please complete your profile setup first");
  }

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="Profile"
                  className="object-cover h-full w-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:h-48 md:w-48 flex items-center justify-center text-5xl border-[1px] rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {getValues("firstName")
                    ? getValues("firstName").split("").shift()
                    : user?.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <form
              onSubmit={handleSubmit(handleProfileSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="w-full">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "First Name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="First Name"
                      className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="w-full">
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Last Name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="Last Name"
                      className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="w-full flex gap-5">
                {colors.map((color, index) => {
                  console.log("color", color);
                  return (
                    <div
                      key={index}
                      className={`h-8 w-8 md:h-12 md:w-12 rounded-full cursor-pointer transition-all duration-300 ${color} ${
                        selectedColor === index
                          ? "outline outline-white/50 outline-2"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedColor(index); // Set the selected color when a color is clicked
                        // setImage("");  // Clear the image when a color is clicked
                      }}
                    ></div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={handleSubmit(handleProfileSubmit)}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
