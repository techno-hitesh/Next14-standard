"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUserAPI } from "@/app/services/apis/user";
import { RegisterType } from "@/app/types/userTypes";
import "@/app/style/style.css"
import { usePathname } from "next/navigation";
import Image from "next/image";
import siteIcon from "@/public/images/4.svg";

const initialFormState = {
  fullName: "",
  email: "",
  password: ""
}

const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let errForm = validate(value);

    if (Object.keys(errForm).length !== 0) {
      setFormErrors(errForm);
    } else {
      setFormErrors({});
      setIsSubmit(true);
      const registerResp = await registerUserAPI(JSON.stringify(value));
      if (registerResp?.status == 201) {
        toast.success("Successfully registered.");
        setTimeout(() => {
          router.push("/login")
        }, 1000);
      } else if (registerResp.status == 400) {
        toast.error(registerResp?.message)
      }
    }
  }

  const validate = (values: any | {}) => {
    const errors: RegisterType | any = {};

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    console.log("valuess", values, regex.test(values.email))

    if (!values.fullName) {
      errors.fullName = "FullName cannot be empty";
      toast.error("FullName cannot be empty");
    }
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
    } else if (value.password.length < 8 || value.password.length > 10) {
      errors.password = "Password must be between 8 and 10 characters long";
      toast.error("Password must be between 8 and 10 characters long");
    }

    return errors;
  }
  const links = pathname.startsWith("/dashboard") ? "/dashboard" : "/admin";
  return (
    <>
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
        <ToastContainer autoClose={2000} />
        <div className="relative w-[850px] h-[500px] bg-white shadow-custom rounded-lg overflow-hidden flex">
          <div className="w-1/2 p-10 flex flex-col justify-center items-center">
            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
              <h1 className="text-black-500 mb-4">Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                name="fullName"
                className="w-full p-3 mb-3 bg-gray-100 border-none outline-none"
                value={value.fullName}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full p-3 mb-3 bg-gray-100 border-none outline-none"
                value={value.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full p-3 mb-3 bg-gray-100 border-none outline-none"
                value={value.password}
                onChange={handleChange}
              />
              <button className="w-full py-3 mt-4  text-white font-bold custom-bg-color">Sign Up</button>
            </form>
          </div>
          <div className="w-1/2  text-white flex flex-col justify-center items-center p-10 custom-bg-color">
            <h1 className="mb-4">Hello, Friend!</h1>
            <p className="text-center mb-8">Enter your personal details and start your journey with us</p>
            <Link href="/login" className="border border-white py-2 px-6 rounded-full text-white">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage;
