"use client"
import { GetProductByIdAPI } from '@/app/services/apis/admin/products'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Review = () => {
    const {id}=useParams()
    const [data,setdata]=useState<any>()
    const getpoductByID=async()=>{
       const response=await GetProductByIdAPI(id)
       if(response?.status===200){
        console.log(response?.getProduct)
        setdata(response?.getpoduct)
       }else{
        toast.error("Something went wrong !")
       }
      
    }
    useEffect(()=>{
     getpoductByID()
    },[])
  return (
    <>
    <div className='flex flex-col border border-md'>
     
        <div>
         <h1>Product Name :{data?.productName}</h1>
        </div>      

     <ToastContainer/>
    </div> 
    </>
  )
}

export default Review