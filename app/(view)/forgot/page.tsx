"use client"
import Link from "next/link"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserForgotType } from "@/app/types/userTypes";
import { forgotPasswordAPI } from "@/app/services/apis/user";
import ResetPass from "./reset";
import "@/app/style/style.css"
import { usePathname } from "next/navigation";
import Image from "next/image";
import siteIcon from "@/public/images/4.svg";

const ForgotPass = () => {

  const [formValue, setFormValue] = useState<UserForgotType>({ email: "" })
  const [otpSend, setOtpSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname();


  const handleForgot = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      setLoading(true)
      const resp = await forgotPasswordAPI(formValue);
      if (resp.status == 404 && resp.message == "Email not found") {
        toast.error(resp.message)

      } else if (resp.status == 200) {

        toast.success(resp.message)
        setTimeout(() => {
          setLoading(false)
          setOtpSend(true)

        }, 2000)
      }

    } catch (error) {
      console.log("handleForgot--", error);
    }
  }

  const handleForm = (e: any) => {
    try {
      const { name, value } = e.target;

      setFormValue((prevProps: any) => ({
        ...prevProps,
        [name]: value
      }));

    } catch (error) {
      console.log("error--", error);
    }
  }
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
      {otpSend == false ?
        <div className="h-screen bg-[#f6f5f7] flex items-center justify-center font-poppins">
          <div className="relative w-[850px] h-[500px] bg-white shadow-custom rounded-lg overflow-hidden flex">
            <div className="w-1/2 custom-bg-color text-white flex flex-col justify-center items-center p-10">
              <h1 className="mb-4">Forgot Password!</h1>
              <p className="text-center mb-8">Enter your email id and we will send the otp on your email</p>
            </div>
            <div className="w-1/2 p-10 flex flex-col justify-center items-center">
              <form className="flex flex-col items-center w-full" onSubmit={handleForgot}>
                <h1 className="text-black-500 mb-4">Forgot Password</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="w-full p-3 mb-3 bg-gray-100 border-none outline-none"
                  value={formValue.email}
                  onChange={handleForm}
                />
                <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold">Reset password {loading == true ? "Loading...." : ""}</button>
              </form>
              <button className="w-full py-3 mt-4 custom-bg-color text-white font-bold"><Link href="/login">
                Back to login
              </Link></button>
            </div>
          </div>
        </div>
        : <ResetPass formValue={formValue} />}
    </>
  )
}

export default ForgotPass