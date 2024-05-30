"use client"
import { UserRoleAPI } from "@/app/services/apis/user";
import auth from "@/app/configs/auth";
import Navbar from "./components/navbar";
import React,{ useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { jwtEncodeData } from "@/app/helpers";
import { addUser } from "@/app/store/slices/userSlicer";
import Footer from "../_components/footer";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const dispatch = useDispatch();

    const data = async()=>{
      const userData = await UserRoleAPI();
      const jwtencode:any = jwtEncodeData(userData.userData);
      dispatch(addUser(jwtencode))
    }

    useLayoutEffect(()=>{
      data()
    },[])
   
  return (
        <>

        <React.Suspense fallback={<>...</>}>
          <div className="lg:container w-screen mx-auto"> 
          <Navbar />
            {children}
            <Footer/>
          </div>
        </React.Suspense>
        </>
    );
  }
  