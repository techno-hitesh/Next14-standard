"use client"
import Link from "next/link"
import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgLogo from "@/public/images/logo.svg"
import { UserForgotType } from "@/app/types/userTypes";
import { forgotPasswordAPI } from "@/app/services/apis/user";
import ResetPass from "./reset";

const ForgotPass = () => {

  const [formValue, setFormValue] = useState<UserForgotType>({ email: ""})
  const [otpSend , setOtpSend] = useState(false)
  const [loading , setLoading] = useState(false)


  const handleForgot = async(e: React.SyntheticEvent<HTMLFormElement>) =>{
    try {
      e.preventDefault()

      setLoading(true)
      const resp = await forgotPasswordAPI(formValue);
      if(resp.status == 404 && resp.message =="Email not found"){
        toast.error(resp.message)

      }else if(resp.status ==200){

        toast.success(resp.message)
        setTimeout(()=>{
          setLoading(false)
          setOtpSend(true)
          
        },2000)
      }    

    } catch (error) {
      console.log("handleForgot--",error);
    }
  }

  const handleForm = (e: any) =>{
    try {
        const { name, value } = e.target;

        setFormValue((prevProps: any) => ({
          ...prevProps,
          [name]: value
        }));

    } catch (error) {
      console.log("error--",error);
    }
  }

 return (
    <>
      <ToastContainer autoClose={2000} />
      {otpSend ==false ? 
      <section className="bg-dark-50 dark:bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-3 " src={ImgLogo.src} alt="logo" />
              <h3 className="text-black">UrbanCart</h3>
          </Link>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">Do not fret,Just type in your email and we will send you a code to reset your password!</p>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleForgot}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required 
                value={formValue.email}
                onChange={handleForm}
                />
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reset password {loading==true ? "Loading....":""}</button>
            </form>
          </div>
          

        </div>
      </section>

      : <ResetPass  formValue={formValue}/>}
      
</>
)
}

export default ForgotPass