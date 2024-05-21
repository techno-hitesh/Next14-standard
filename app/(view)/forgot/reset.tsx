"use client"
import Link from "next/link"
import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgLogo from "@/public/images/logo.svg"
import { UserResetType } from "@/app/types/userTypes";
import { forgotResetAPI } from "@/app/services/apis/user";
import { useRouter } from "next/navigation";

const ResetPass = (props:{formValue:{email:string}}) => {

  const router = useRouter()
  const {email} = props.formValue;

  const [formVal, setFormVal] = useState<UserResetType>({ email: email ,otp:"",newPassword: "",
    confirmPassword:""
    })

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) =>{
    try {
      e.preventDefault()
      let errForm :{}|"" = validate(formVal);

      if(!Object.keys(errForm).length ){

        const resp = await forgotResetAPI(formVal);
        if(resp.status == 404 && resp.message =="Invalid OTP or OTP expired"){
              toast.error(resp.message)
        }else if(resp.status == 200){
            toast.success("your password reset successfully...!")
            setTimeout(()=>{
                router.replace("/login");
            },1000)
        }

      }

    } catch (error) {
      console.log("handleForgot--",error);
    }
  }

  const handleForm = (e: any) =>{
    try {
        const { name, value } = e.target;
        // if (name=="otp" && !/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
        //     e.preventDefault();
        //     toast.error("Please enter a 4 digit number");
        // }
        setFormVal((prevProps: any) => ({
          ...prevProps,
          [name]: value
        }));

    } catch (error) {
      console.log("error--",error);
    }
  }

  const validate = (values:any|{}) =>{
    const errors:UserResetType|any = {};

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    console.log("valuess",values,regex.test(values.email))
  
    if(!values.email){
      errors.email = "Email cannot be empty.";
      toast.error("Email cannot be empty.");

    }else if (regex.test(values.email) == false){
      errors.email = "Please enter a valid email address.";
      toast.error("Please enter a valid email address.");
    }

    if(!values.otp){
        errors.otp = "OTP cannot be empty.";
        toast.error("OTP cannot be empty.");
    }else if (!/^\d+$/.test(values.otp)) { 
        errors.otp = "OTP must be a numeric value.";
        toast.error("OTP must be a numeric value.");

    } else if (values.otp.length !== 4) {
        errors.otp = "OTP must be a 4-digit number.";
        toast.error("OTP must be a 4-digit number.");
    }

    if(values.newPassword !== values.confirmPassword){
      errors.password = "Passwords do not match.";
      toast.error("Passwords do not match..");
    }

    if(!values.newPassword){
      errors.password = "Password is required";
      toast.error("Password is required");
    }else if (values.newPassword.length < 8 || values.newPassword.length > 10) {
      errors.password = "Password must be between 8 and 10 characters long";
      toast.error("Password must be between 8 and 10 characters long");
    }
    return errors;
  }


 return (
    <>
      <ToastContainer autoClose={1000} />

      {email ? 
      <section className="bg-dark-50 dark:bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-3 " src={ImgLogo.src} alt="logo" />
              <h3 className="text-black">UrbanCart</h3>
          </Link>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset your password?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your OTP and your new password!</p>

            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5"  onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required 
                defaultValue={email}
                disabled
                />
              </div>
              <div>
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your OTP</label>
                <input  name="otp" id="otp" type="text" inputMode="numeric"           autoComplete="one-time-code" maxLength={4} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                
                required 
                value={formVal.otp}
                onChange={handleForm} 
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password</label>
                <input type="password" name="newPassword" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter you new password" required 
                // autoComplete="new-password"
                value={formVal.newPassword}
                onChange={handleForm} 
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                value={formVal.confirmPassword}  
                onChange={handleForm}               
                />
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reset password</button>
            </form>
          </div>
        </div>
      </section>
      :""}
      

</>
)
}

export default ResetPass