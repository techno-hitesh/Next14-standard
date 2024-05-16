"use client"
import { useState,useRef,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';
import authConfig from "@/app/configs/auth"
import UserModal from "./modal"
import Link from "next/link";
import { useSelector } from "react-redux";
import { jwtDecodeData } from "@/app/helpers";

const Dropdown = () => {
    const cookies = useCookies();

    const router = useRouter();
    const dropdownRef = useRef(null);
    const [userName,setUserName] = useState("")
    const userDataName = useSelector((data:any)=> data.users);

    const getUserData = ()=>{
        if (userDataName !="" && typeof userDataName?.users?.data === 'string') {
            const decodedData:any = jwtDecodeData(userDataName?.users?.data);
            setUserName(decodedData?.fullName)
        }
    }
    

    // const userName:any = jwtDecodeData(userDataName?.users[0]?.data)
    // console.log(typeof userDataName?.users[0]?.data)
   

    const [isOpen, setIsOpen] = useState(false);
    const [userMdl,setUserMdl] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleSubmit = () =>{ 
        // console.log("dsafsdf")
        localStorage.removeItem('toastShownBefore');
        localStorage.removeItem(authConfig.storageTokenKeyName);
        localStorage.removeItem(authConfig.storageRole);
        cookies.remove(authConfig.storageTokenKeyName)
        cookies.remove(authConfig.storageRole)
        router.replace("/login")
    }

    const userPrfRedirect = ()=>{
        setIsOpen(false);
        setTimeout(()=>{
            router.replace("/dashboard/profile")
        },1000)
    }

    const paymentRedirect = ()=>{
        setIsOpen(false);
        setTimeout(()=>{
            router.replace("/dashboard/invoice")
        },1000)
    }

    useEffect(() => {
       
        getUserData()
        const handleOutsideClick = (event:any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [userDataName]);


    return (
        <>
        <div className='py-2 pb-3'>
            <div className="relative inline-block" ref={dropdownRef}  >
                <button
                    type="button"
                    className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >

                    {userName && userName!="" ? userName : ""} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                             <li>
                                <button type="submit"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={userPrfRedirect}
                                >
                                    User Profile
                                </button>
                            </li>
                            
                            <li>
                                <button
                                    type="submit"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={paymentRedirect}
                                >
                                    Invoice
                                </button>
                            </li>
                            <li>
                                <span
                                    
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={handleSubmit}
                                >
                                    Singout 
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>

        </>
    )
}

export default Dropdown
