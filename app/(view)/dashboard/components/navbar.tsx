"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import siteIcon from "@/public/images/4.svg";
import wishlistIcon from "@/public/images/5.svg";
import { adminRoute, userRoute } from "../utils/navLink";
import { usePathname } from "next/navigation";
import { NavbarUserType } from "@/app/types/userTypes";
import Dropdown from "./dropdown";
import auth from "@/app/configs/auth";
import { jwtDecodeData } from "@/app/helpers";
import "@/app/style/style.css"

const Navbar = () => {
  const pathname = usePathname();
  const [arrLink, setArrLink] = useState<[] | any>([]);
  const [subTotal, setSubTotal] = useState(0);
  var decodeRole: any;

  const updateLink = () => {
    const token = localStorage.getItem(auth.storageRole);
    decodeRole = jwtDecodeData(token);
    if (decodeRole === "user") {
      setArrLink(userRoute);
    } else if (decodeRole === "admin") {
      setArrLink(adminRoute);
    }
  };

  useEffect(() => {
    updateLink();
  }, []);

  const links = pathname.startsWith("/dashboard") ? "/dashboard" : "/admin";

  return (
    <>
      <div className="mb-3 flex justify-between items-center w-full h-20 px-2 text-black bg-white">
        <div className="inline-flex">
          <h1 className="text-5xl font-signature ml-2">
            <Link href={links}>
              <Image
                priority
                src={siteIcon}
                height={34}
                width={35}
                alt="image"
              />
            </Link>
          </h1>
          <Link href={links}>
            <h1 className="ml-8 mt-1">UrbanCart</h1>
          </Link>
        </div>

        <ul className="hidden md:flex">
          {arrLink != "" && arrLink.length > 0
            ? arrLink.map(({ id, link, name }: NavbarUserType) => (
              <li
                key={id}
                className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline"
              >
                <Link href={link}>{name}</Link>
              </li>
            ))
            : ""}
        </ul>
        <Link href={'/dashboard/wishlist'} className="flex items-center">
          <button className="my-icon-unfilled swym-button swym-add-to-wishlist swym-iconbtnlink swym-heart swym-added swym-loaded">
            <Image src={wishlistIcon} priority height={32} width={32} alt="Wishlist Icon" />
          </button>
          <h3 className="ml-2">Wishlist</h3>
        </Link>
        <Link href={`${links}/cart`}>
          <div className="relative py-2">
            <div className="t-0 absolute left-6">
            </div>
            <Image
              priority
              src={Logo}
              height={32}
              width={32}
              alt="image"
            />
          </div>
        </Link>


        <Dropdown />
      </div>
    </>
  );
};

export default Navbar;
