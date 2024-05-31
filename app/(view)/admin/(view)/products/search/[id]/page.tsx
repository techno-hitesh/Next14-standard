"use client"
import Search from '@/app/(view)/admin/components/search'
import ProductCard from '@/app/(view)/dashboard/components/productCard'
import { getproductBySearch } from '@/app/services/apis/admin/products'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const {id}=useParams()
  const [usrProducts,setsearchProdcuts]=useState([])
  const fetchdata=async()=>{
      const response=await getproductBySearch(id)
      if(response?.status===200){
        console.log(response?.data?.products)
        setsearchProdcuts(response?.data)
      }
  }
  useEffect(()=>{
     fetchdata()
  },[])
  return (
    <div>
      <div className='flex justify-center items-center my-4'>
      <Search/>  
      </div>
      {
        usrProducts? 
        <ProductCard usrProducts={usrProducts}/>
      :"Loading..."
      }
    </div>
  )
}

export default Page