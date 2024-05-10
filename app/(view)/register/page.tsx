"use client"
import React,{ useEffect, useState } from "react"
import Link from "next/link"
import { useCookies } from 'next-client-cookies';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { RegisterType } from "@/app/types/userTypes";
import { registerUserAPI } from "@/app/services/apis/user";
import 'react-toastify/dist/ReactToastify.css';


const initialFormState: RegisterType = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const RegisterPage = () => {

  const router = useRouter();

  const [value,setValue]  = useState(initialFormState)
  const [formErrors,setFormErrors] = useState<any>({});
  const [isSubmit,setIsSubmit]  = useState<Boolean>(false);

  const handleChange = (e:any) =>{    
    const {name,value} = e.target;
    setValue((prevProps:any) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault()
    let errForm :{}|"" = validate(value);

    console.log("errform",errForm);

    if(Object.keys(errForm).length !== 0){
      setFormErrors(errForm);

    }else{
       setFormErrors({});
       setIsSubmit(true);
       const registerResp = await registerUserAPI(JSON.stringify(value))  
       if(registerResp?.status ==201){
        // console.log(" 201 registerResp",registerResp)
        toast.success("Successfully registered.");
        setTimeout(()=>{
          router.push("/login")
        },1000)
            
      }else if(registerResp.status == 400){  
        console.log("error registerResp",registerResp)    
        const {message} = registerResp;
        // setBackendErrors(apiErrValidate(message));
      }
      
    }
  
  }

  const apiErrValidate = (message:any|{}) =>{
    const errors:RegisterType|any = {};

    // Regex pattern for matching email
    const emailPattern: RegExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

    // Check if email exists in the string
    const emailExists: boolean = emailPattern.test(message);

    if(emailExists === true){
      errors.email = message;
      toast.error(message);
    }

    // Regex pattern for matching Password
    const passwordPattern: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;

    // Find all occurrences of password in the string
    const passwordsFound: boolean = passwordPattern.test(message);

    if(passwordsFound === true){
      errors.password = "Password must have at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
      toast.error("Password must have at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
    }

    return errors;
  }

  const validate = (values:any|{}) =>{
    const errors:RegisterType|any = {};

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    console.log("valuess",values,regex.test(values.email))

    if(!values.fullName){
      errors.fullName = "FullName cannot be empty";
      toast.error("FullName cannot be empty");
    }
    if(!values.email){
      errors.email = "Email cannot be empty.";
      toast.error("Email cannot be empty.");

    }else if (regex.test(values.email) == false){
      errors.email = "Please enter a valid email address.";
      toast.error("Please enter a valid email address.");
    }

    if(values.password !== values.confirmPassword){
      errors.password = "Passwords do not match.";
      toast.error("Passwords do not match..");
    }

    if(!values.password){
      errors.password = "Password is required";
      toast.error("Password is required");
    }else if (value.password.length < 8 || value.password.length > 10) {
      errors.password = "Password must be between 8 and 10 characters long";
      toast.error("Password must be between 8 and 10 characters long");
    }

    // else if(values.password.length < 8){
    //   errors.password = "Password must be at least 8 characters long";
    //   toast.error("Password must be at least 8 characters long");
    // } else if(values.password.length > 10){
    //   errors.password = "Password must be at most 10 characters long";
    //   toast.error("Password must be at most 10 characters long");

    return errors;
  }



  return (
    <>
    
    <div className="container mx-auto">
       <ToastContainer autoClose={2000} />
    <form
    className='flex flex-col justify-center items-center gap-5 max-w-lg  shadow-2xl shadow-gray-900 h-screen hover:shadow-gray-300  bg-white mx-auto rounded-md text-gray-900 mt-4' onSubmit={handleSubmit} >

    <h3 className='text-2xl '>Create New Account! </h3>
    <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Name
        </span>
        <input required type="name" name="fullName" className="mt-1 px-3 py-4 w-[350px] md:w-[450px] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Enter your name" 
         value={value.fullName}
         onChange={(e)=>handleChange(e)}
        />
         {/* <p className="text-red-500">{formErrors.fullName}</p> */}
    </label>

    <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
        </span>
        <input required type="email" name="email" className="mt-1 px-3 py-4 w-[350px] md:w-[450px] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Enter your email address" 
        value={value.email}
        onChange={(e)=>handleChange(e)}
        />
         {/* <p className="text-red-500">{formErrors.email}</p> */}
    </label>

    <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
        </span>
        <input required type="password" name="password" className="mt-1 w-[350px] md:w-[450px] px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password" 
         value={value.password}
         onChange={(e)=>handleChange(e)}
        />
         {/* <p className="text-red-500" style={{ maxWidth: "450px" }}>{formErrors.password}</p> */}
    </label>
    <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Confirm Password
        </span>
        <input required type="password" name="confirmPassword" className="mt-1 w-[350px] md:w-[450px] px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password"         
        value={value.confirmPassword}
        onChange={(e)=>handleChange(e)}
        />
        {/* <p className="text-red-500">{formErrors.confirmPassword}</p> */}
    </label>
    <span className='block w-full mr-auto ml-7'>Already have an Account? <Link className='text-blue-700 font-bold' href="/login">Log In</Link></span>
    <button className='bg-[#53c28b] text-white rounded-md p-[15px] w-[90%]' type="submit">Sign Up</button>
    {/* <button  className='bg-[#53c28b] text-white rounded-md p-[15px] w-[90%]' >Continue With Google</button> */}
</form>
</div>

    
    </>
  )
}

export default RegisterPage