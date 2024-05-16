"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from "@/public/images/logo.svg"
import siteIcon from "@/public/images/4.svg"
import { adminRoute, userRoute } from '../utils/navLink'
import { usePathname } from 'next/navigation'
import { NavbarUserType } from '@/app/types/userTypes'
import Dropdown from './dropdown';
import { useDispatch, useSelector } from "react-redux"
import { addUser } from '@/app/store/slices/userSlicer'
import { getToCartAPI } from '@/app/services/apis/user'
import auth from '@/app/configs/auth'


const Navbar = () => {
    
    
    const pathname = usePathname()
    const [arrLink,setArrLink] = useState<[]|any>([])
    const [subTotal, setSubTotal] = useState(0)

    // const getAllCart = async () => {
    //     const resp = await getToCartAPI();
    //     if (resp.status == 200) {
    //       const datas = resp.data.cartItems.filter((data:any)=>{
    //         if(data.message !== "Product not found"){
    //             return data
    //         }
    //       })
    //       setSubTotal(resp.data.totalCount);
    //     }
    //   }
    
    //   useEffect(() => {
    //     getAllCart()
    //   }, [])
     
    
    const updateLink=()=>{
        const role=localStorage.getItem(auth.storageRole)
        console.log("role",role)
        if(role==="user"){
            setArrLink(userRoute)
        }else if(role==="admin"){
            setArrLink(adminRoute)
        }
    }

   useEffect(()=>{
      updateLink()
   },[])

    const links = pathname.startsWith("/dashboard") ? "/dashboard" : "/admin";
    
    
    return (
    <>
            <div className="flex justify-between items-center w-full h-20 px-2 text-black bg-light-800 nav">
                <div className="inline-flex">
                    {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
                    <h1 className="text-5xl font-signature ml-2">
                        <Link href={links}>
                            <Image
                                priority
                                src={siteIcon}
                                height={34}
                                width={35}
                                alt="Follow us on Twitter"
                            />
                        </Link>
                    </h1>
                    <Link href={links}><h1 className="ml-8 mt-1">Zipkart</h1></Link>

                </div>

                <ul className="hidden md:flex">
                {arrLink !="" && arrLink.length>0 ? arrLink.map(({ id, link ,name}:NavbarUserType) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline"
                    >
                        <Link href={link}>{name}</Link>
                    </li>
                    ))
                :""
                }
                </ul>


             
            <Link href={`${links}/cart`}>
                <div className="relative py-2">
                    <div className="t-0 absolute left-6">
                    {/* {subTotal >0 ? 
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{subTotal}</p>:""} */}
                    </div>
                    <Image
                        priority
                        src={Logo}
                        height={32}
                        width={32}
                        alt="Follow us on Twitter"
                    />
                </div>
            </Link>
            
               
            <Dropdown  checkerVal= {"Guest"}/>

        </div>

    </>
 )
}

export default Navbar