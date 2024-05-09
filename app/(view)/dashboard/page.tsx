"use client"
import React from 'react'
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation"
import './style/style.css';
import authConfig from "@/app/configs/auth"

const DashboardPage = () => {

  const router  = useRouter();
  const cookies = useCookies();

  const handleSignout = () =>{
    try {
      localStorage.removeItem('toastShownBefore');
      localStorage.removeItem(authConfig.storageTokenKeyName);
      localStorage.removeItem(authConfig.storageRole);
      cookies.remove(authConfig.storageTokenKeyName)
      cookies.remove(authConfig.storageRole)
      router.replace("/login")
      
    } catch (error) {
        console.log("error",error)
    }
   
  }
  return (
    <>
     <div className="lg:container w-screen mx-auto flex inline">
      <h1>Dashboard Page</h1>
      <button type="submit" onClick={handleSignout} className='ml-8 custom-button'> Singout</button>
      </div>
    </>
  )
}

export default DashboardPage
function useState<T>(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}

