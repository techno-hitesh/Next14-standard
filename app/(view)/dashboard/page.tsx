"use client"
import React from 'react'
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation"
import './style/style.css';
import CategoryCard from './components/category/categoryCard';

const DashboardPage = () => {

  const router  = useRouter();
  const cookies = useCookies();

  return (
    <>
     
       <div className="lg:container w-screen mx-auto">
          <div>
          <CategoryCard />
          
          </div>
         
      </div>
    </>
  )
}

export default DashboardPage

{/* <div className="lg:container w-screen mx-auto flex inline">
  <h1>Dashboard Page</h1>
  <button type="submit" onClick={handleSignout} className='ml-8 custom-button'> Singout</button>
  </div> */}