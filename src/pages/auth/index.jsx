import React from "react";
import { useForm, Controller } from "react-hook-form";
import Victory from "../../assets/victory.svg";
import Background from "../../assets/login2.png";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { login, register } = useAuth();
  const [authError, setAuthError] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("login");

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log("Login Data:", data);
    setAuthError("");

    const loginData = {
      email: data.login_email,
      password: data.login_password,
    };

    try {
      const response = await login(loginData);
      if(response.data.user.id) {
        if (response.data.user.profileSetup) {
          navigate("/chat");
        } else navigate("/profile");
      }
      navigate("/chat");
      console.log("response", response);
      console.log("response data", response.data);
      console.log("response data config", response.config);
      
    } catch (error) {
      console.log("error", error);
      console.log("index login error response:", error.response);
      console.log("index login error message:", error.message);
      console.log("index login error request:", error.request);

      if (error.response && error.response.status !== 500) {
        const message = error.response.data.message;
        setAuthError(message);
      } else {
        setAuthError(error.response.data.message);
      }
    }
  };

  const handleRegister = async (data) => {
    console.log("Register Data:", data);

    const registerData = {
      email: data.register_email,
      password: data.register_password,
      password_confirmation: data.register_confirmPassword,
    };

    console.log("registerData", registerData);

    try {
      const response = await register(registerData);

      if (response.status === 201) {
        navigate("/profile");
      }
      console.log(response);
      
      setActiveTab("login");
    } catch (error) {
      if (error.response && error.response.status !== 500) {
        const message = error.response.data.message;
        setAuthError(message);
      } else {
        setAuthError(error.response.data.message);
      }
    }
  };

  // useEffect(() => {
  //   console.log("errors", errors);
  //   console.log("authError", authError);
  //   console.log("activeTab", activeTab);
  // });

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold lg:text-6xl">Welcome</h1>
              <img src={Victory} alt="victory" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="login"
              className="w-3/4"
            >
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 table-cell duration-300"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 table-cell duration-300"
                  value="register"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="flex flex-col gap-5"
                >
                  <Controller
                    name="login_email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="rounded-full p-6"
                      />
                    )}
                  />
                  {errors.login_email && (
                    <p className="text-red-500">{errors.login_email.message}</p>
                  )}

                  <Controller
                    name="login_password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="rounded-full p-6"
                      />
                    )}
                  />
                  {errors.login_password && (
                    <p className="text-red-500">
                      {errors.login_password.message}
                    </p>
                  )}

                  <Button type="submit" className="rounded-full p-6">
                    Login
                  </Button>

                  {authError && <p className="text-red-500">{authError}</p>}
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent className="flex flex-col gap-5" value="register">
                <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="flex flex-col gap-5"
                >
                  <Controller
                    name="register_email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="rounded-full p-6"
                      />
                    )}
                  />
                  {errors.register_email && (
                    <p className="text-red-500">
                      {errors.register_email.message}
                    </p>
                  )}

                  <Controller
                    name="register_password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="rounded-full p-6"
                      />
                    )}
                  />
                  {errors.register_password && (
                    <p className="text-red-500">
                      {errors.register_password.message}
                    </p>
                  )}

                  <Controller
                    name="register_confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === getValues("register_password") ||
                        "Passwords do not match",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        className="rounded-full p-6"
                      />
                    )}
                  />
                  {errors.register_confirmPassword && (
                    <p className="text-red-500">
                      {errors.register_confirmPassword.message}
                    </p>
                  )}

                  <Button type="submit" className="rounded-full p-6">
                    Register
                  </Button>
                  {authError && <p className="text-red-500">{authError}</p>}
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="justify-center items-center hidden xl:flex">
          <img src={Background} alt="Background Image" className="h-4/5" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
