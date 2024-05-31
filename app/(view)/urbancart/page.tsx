"use client"
import React from 'react'
import CategoryCard from './_components/categroycard';
import Des from './_components/des';



const UrbanCart = () => {
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