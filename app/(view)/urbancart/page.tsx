"use client"
import React from 'react'
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation"
import CategoryCard from './_components/categroycard';
import Des from './_components/des';



const UrbanCart = () => {

  const router  = useRouter();
  const cookies = useCookies();

  return (
    <>
     
       <div className="lg:container w-screen mx-auto">
          <div>

            <Des/>
          <CategoryCard />
          
          </div>
         
      </div>
    </>
  )
}

export default UrbanCart