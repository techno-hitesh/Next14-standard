"use client";
import { AllPaymentsAdminApi } from '@/app/services/apis/admin/charts'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import back from "@/public/images/pro.webp"

const Transcation = () => {
   const [data,setdata]=useState([])
   const [total,settotal]=useState("")
   const [pending,setpending]=useState("")
   const [sucess,setsucess]=useState("")
   const fetchPayments=async()=>{
    const response=await AllPaymentsAdminApi()
    if(response?.status===200){
        settotal(response?.totalPaymentCount)
        setdata(response?.payments)
        setsucess(response?.successPaymentCount)
        setpending(response?.pendingPaymentCount)
    }
    
   }

   useEffect(()=>{
    fetchPayments()
   },[])
  return (
    <div>
        <div className='flex justify-between items-center'>
        <div>
        <h1 className='text-3xl font-bold'>Transcations</h1>
        <p className='text-gray-400'>All customer transcations. Upto date !</p>
        </div>
         <div>
           
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="grid grid-cols-3 gap-3 mb-2">
          <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm font-medium flex items-center justify-center mb-1">{total}</dt>
            <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium">Total</dd>
          </dl>
          <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm font-medium flex items-center justify-center mb-1">{sucess}</dt>
            <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium">Success</dd>
          </dl>
          <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
            <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-red-600 dark:text-red-300 text-sm font-medium flex items-center justify-center mb-1">{pending}</dt>
            <dd className="text-red-600 dark:text-red-300 text-sm font-medium">Pending</dd>
          </dl>
        </div>
   
      </div>
    
         </div>
        </div>
       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        
        <table className="w-full my-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Products
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Payment
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((data:any,index)=>(
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <Image
                     src={back}
                     alt='Loading..'
                     className="w-8 h-8 mx-1 rounded-full" 
                      /> 
                        <div >
                            <div className="text-base font-semibold">{data?.buyerUserId?.fullName[0].toUpperCase()+data?.buyerUserId?.fullName.slice(1)}</div>
                            <div className="font-normal text-gray-500">{data?.buyerUserId?.email}</div>
                        </div>  
                    </th>
                    <td   className="px-6 py-4">
                        {data?.totalProduct.length}
                    </td>
                    
                    <td className="px-6 py-4">
                    ₹{data?.totalCartAmount}
                    </td>
                    {data?.paymentStatus==="Completed" ? 
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                             {data?.paymentStatus}
                            </div>
                    </td>
                    :  <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                         {data?.paymentStatus}
                        </div>
                </td>}
                </tr>

                ))}
              
            </tbody>
        </table>

        </div>
    </div>

  )
}

export default Transcation