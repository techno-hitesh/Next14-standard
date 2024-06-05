"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import siteIcon from "@/public/images/4.svg";
import { usePathname } from "next/navigation";
import { NavbarUserType } from "@/app/types/userTypes";
import HoverDropdown from "../../_components/hoverDropdown";
import "@/app/style/style.css"


const Navbar = () => {
  const pathname = usePathname();
  const [arrLink, setArrLink] = useState<[] | any>([]);

  return (
    <>
      <div className="mb-3 flex justify-between items-center w-full h-20 px-2 text-black bg-white">
        <div className="inline-flex">
          <h1 className="text-5xl font-signature ml-2">
            <Link href={'/urbancart'}>
              <Image
                priority
                src={siteIcon}
                height={34}
                width={35}
                alt="banner"
              />
            </Link>
          </h1>
          <Link href={'/urbancart'}>
            <h1 className="ml-8 mt-1 text-2xl font-bold">UrbanCart</h1>
          </Link>
        </div>


        <div className="flex items-center gap-10">

          <Link href={'/login'}>
            <button className=" custom-bg-color rounded-md text-white px-4 py-1 text-lg font-semibold">Login</button>
          </Link>
          <Link href={'/login'}>
            <div className="relative py-2">
              <div className="t-0 absolute left-6">

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
        </div>



      </div>
    </>
  );
};

export default Navbar;
