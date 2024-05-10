// "use client"
import { UserRoleAPI } from "@/app/services/apis/user";
import auth from "@/app/configs/auth";
import Navbar from "./components/navbar";
import { useEffect, useLayoutEffect, useState } from "react";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

   
  return (

        <div className="lg:container w-screen mx-auto"> 
        <Navbar />
          {children}
        </div>
    );
  }
  