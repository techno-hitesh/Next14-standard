"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from "@/public/images/3.svg"
import { userRoute } from '../utils/navLink'
import { usePathname } from 'next/navigation'
import { NavbarUserType } from '@/app/types/userTypes'
import Dropdown from './dropdown'


const Navbar = () => {

    const pathname = usePathname()
    const [arrLink,setArrLink] = useState<[]|any>(userRoute)


    const links = pathname.startsWith("/dashboard") ? "/dashboard" : "#";
    return (
    <>
            <div className="flex justify-between items-center w-full h-20 px-2 text-black bg-light-800 nav">
                <div className="inline-flex">
                    {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
                    <h1 className="text-5xl font-signature ml-2">
                        <Link href={links}>
                            <Image
                                priority
                                src={Logo}
                                height={32}
                                width={32}
                                alt="Follow us on Twitter"
                            />
                        </Link>
                    </h1>
                    <Link href={links}><h1 className="ml-8 mt-1">Zipkart</h1></Link>

                </div>

                <ul className="hidden md:flex">
                {arrLink !="" && arrLink.map(({ id, link ,name}:NavbarUserType) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline"
                    >
                        <Link href={link}>{name}</Link>
                    </li>
                    ))}
                </ul>
                <Dropdown  checkerVal= {"Guest"}/>

            </div>

    </>
 )
}

export default Navbar