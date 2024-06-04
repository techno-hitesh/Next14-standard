"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUserAPI, UserRoleAPI } from "@/app/services/apis/user/index";
import { useCookies } from "next-client-cookies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserType } from "@/app/types/userTypes";
import authConfig from "@/app/configs/auth";
import { jwtEncodeData } from "@/app/helpers";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "@/app/style/style.css"
import { usePathname } from "next/navigation";
import Image from "next/image";
import siteIcon from "@/public/images/4.svg";

const initialFormState = {
  email: "",
  password: "",
};

const Login = () => {
  const cookies = useCookies();
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => {
    return state.user;
  });

  const [formValue, setFormValue] = useState<UserType | any>(initialFormState);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errForm: {} | "" = validate(formValue);

    if (Object.keys(errForm).length !== 0) {
      setFormErrors(errForm);
    } else {
      const check = await LoginChecker(formValue);

      if (check) {
        setIsSubmit(true);
        const userResp = await UserRoleAPI();

        if (userResp.status == 200) {
          setIsSubmit(false);
          const jwtencode = jwtEncodeData(userResp.userData.fullName);

          const { role } = userResp.userData.role;
          const jwtRole: any = jwtEncodeData(role);

          if (role === "user") {
            cookies.set(authConfig.storageRole, jwtRole);
            localStorage.setItem(authConfig.storageRole, jwtRole);
            router.push("/dashboard");
          } else if (role === "admin") {
            cookies.set(authConfig.storageRole, jwtRole);
            localStorage.setItem(authConfig.storageRole, jwtRole);
            router.push("/admin");
          }
        } else {
          toast.error("Server Error Please Wait!!");
        }
      }
    }
  };

  const LoginChecker = async (data: UserType) => {
    const isLoginData = await loginUserAPI(JSON.stringify(data));

    if (isLoginData?.status === 200) {
      cookies.set(authConfig.storageTokenKeyName, isLoginData.token);
      localStorage.setItem(authConfig.storageTokenKeyName, isLoginData.token);

      return isLoginData;
    } else {
      toast.error(isLoginData?.message);
      return false;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prevProps: any) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const validate = (values: any | {}) => {
    const errors: UserType | any = {};

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    console.log("regex email values", regex.test(values.email));
    if (!values.email) {
      errors.email = "Email cannot be empty.";
      toast.error("Email cannot be empty.");
    } else if (regex.test(values.email) == false) {
      errors.email = "Please enter a valid email address.";
      toast.error("Please enter a valid email address.");
    }

    if (!values.password) {
      errors.password = "Password is required";
      toast.error("Password is required");
    } else if (values.password.length < 8 || values.password.length > 10) {
      errors.password = "Password must be between 8 and 10 characters long";
      toast.error("Password must be between 8 and 10 characters long");
    }

    return errors;
  };
  const links = pathname.startsWith("/dashboard") ? "/dashboard" : "/admin";
  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className=" flex justify-center items-center ">
        <div className="absolute top-0 mt-28">
          <div className="inline-flex">
            <h1 className="text-5xl font-signature ml-2">
              <Link href={links}>
                <Image
                  priority
                  src={siteIcon}
                  height={34}
                  width={35}
                  alt="banner"
                />
              </Link>
            </h1>
            <Link href={links}>
              <h1 className="ml-8 mt-1 text-2xl font-bold">UrbanCart</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-screen bg-[#f6f5f7] flex items-center justify-center font-poppins">
        <div className="relative w-[850px] h-[500px] bg-white shadow-custom rounded-lg overflow-hidden flex">
          <div className="w-1/2  text-white flex flex-col justify-center items-center p-10 custom-bg-color" >
            <h1 className="mb-4">Welcome Back!</h1>
            <p className="text-center mb-8">To keep connected with us please login with your personal info</p>
            <Link href="/register" className="border border-white py-2 px-6 rounded-full text-white">
              Sign Up
            </Link>
          </div>
          <div className="w-1/2 p-10 flex flex-col justify-center items-center">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
              <h1 className="text-black-500 mb-4">Login</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full p-3 mb-3 bg-gray-100 border-none outline-none"
                value={formValue.email}
                onChange={handleChange}
              />
              <div className="w-full relative">
                <input
                  type={type}
                  placeholder="Password"
                  name="password"
                  className="w-full p-3 mb-3 bg-gray-100 border-none outline-none"
                  value={formValue.password}
                  onChange={handleChange}
                />
                <span className="absolute top-3 right-3 cursor-pointer" onClick={handleToggle}>
                  <Icon icon={icon} size={20} />
                </span>
              </div>
              <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold">{isSubmit ? "Loading......." : "Log In"}</button>
            </form>
            <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold"><Link href="/forgot">
              Forget Password
            </Link></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
