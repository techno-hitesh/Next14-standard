"use client"
import Link from "next/link"
import { useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "@/app/store/slices/userSlicer"
import { useRouter } from "next/navigation"
import { loginUserAPI, UserRoleAPI } from "@/app/services/apis/user/index"
import { useCookies } from 'next-client-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserType } from "@/app/types/userTypes"
import authConfig from "@/app/configs/auth"
import { jwtDecodeData,jwtEncodeData } from "@/app/helpers" 
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


const Login = () => {

  const cookies = useCookies();
  const router = useRouter();

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => {
    return state.user;
  })

  const [formValue, setFormValue] = useState<UserType | any>({ email: "", password: "" })
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);
  const [valMatch, setValMatch] = useState("")
  const [apiErr, setApiErr] = useState<string | {} | any>("")

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }


  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    let errForm: {} | "" = validate(formValue);

    if (Object.keys(errForm).length !== 0) {
      setFormErrors(errForm);

    } else {
      const check = await LoginChecker(formValue);

        if (check) {
          setIsSubmit(true);
          const userResp = await UserRoleAPI();
          // console.log("userRoleAPI ", userResp)
          
          if (userResp.status == 200) {

            setIsSubmit(false);
            const jwtencode = jwtEncodeData(userResp.userData.fullName);
            // dispatch(addUser(jwtencode));
            

            const { role } = userResp.userData.role;
            const jwtRole:any = jwtEncodeData(role);

            if (role === "user") {
              cookies.set(authConfig.storageRole, jwtRole)
              localStorage.setItem(authConfig.storageRole, jwtRole)
              router.push("/dashboard");
            }else if(role ==="admin"){
              cookies.set(authConfig.storageRole, jwtRole)
              localStorage.setItem(authConfig.storageRole, jwtRole)
              router.push("/admin");
            }

          } else {
            toast.error("Server Error Please Wait!!")
          }
          
        }
    }
  }


  const LoginChecker = async (data: UserType) => {

    const isLoginData = await loginUserAPI(JSON.stringify(data))

    if (isLoginData?.status === 200) {

      cookies.set(authConfig.storageTokenKeyName, isLoginData.token)
      localStorage.setItem(authConfig.storageTokenKeyName, isLoginData.token)

      return isLoginData;

    } else  {
      toast.error(isLoginData?.message);
      return false;
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prevProps: any) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const validate = (values: any | {}) => {
    const errors: UserType | any = {};

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    console.log("regex email values", regex.test(values.email))
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
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="bg-[#53c28b]  relative p-6 flex justify-center items-center text-white w-full h-full">
         <Link href={'/urbancart'}>
         <h1 className="font-bold text-2xl">UrbanCart</h1>
         </Link>
          
      </div>
      <form
        className='flex mt-20  py-12 flex-col  justify-center items-center gap-5 max-w-lg shadow-2xl shadow-gray-900 h-[90%] hover:shadow-gray-300  bg-white mx-auto rounded-md text-gray-900 ' onSubmit={handleSubmit}  >
        <h3 className='text-2xl '>Please Log In! </h3>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input required type="email" name="email" className="mt-1 px-3 py-4 w-[350px] md:w-[450px] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            value={formValue.email}
            onChange={(e) => handleChange(e)}

            placeholder="Enter your email address" />
          {/* <p className="text-red-500">{formErrors.email}</p> */}
        </label>

        
        <label className="block">
        <div className="flex items-center justify-between">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>         
        </div>
          
        <div className="mb-8 flex">
          <input required type={type} name="password" className="mt-1 w-[350px] md:w-[450px] px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password"
            value={formValue.password}
            onChange={(e) => handleChange(e)}
          />
          <span className="flex justify-around items-center select-none" onClick={handleToggle}>
                  <Icon className="absolute mr-12" icon={icon} size={25}/>
              </span>
          </div>
          {/* <p className="text-red-500">{formErrors.password}</p> */}
        </label>

        {isSubmit == false && apiErr != "" ?
          <p className="text-red-500">{apiErr.message}</p>
          : ""
        }

        
        <div className="flex  flex-inline justify-between">
          <span className='mr-20 '>Dont have any Account? 
          <Link className='text-blue-700 font-bold' href="/register">Sign Up</Link>
          </span>   
          <div className="text-sm ">
              <Link href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>

        </div>  

        <button className='bg-[#53c28b] text-lg text-white rounded-md p-[10px] w-[90%]' type="submit">{isSubmit ==true ? "Loading......." :"Log In"}</button>
      </form>
      
    </>
  )
}

export default Login