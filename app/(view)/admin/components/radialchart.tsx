"use client";
import { GetUsersAdminAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState} from 'react'
import Image from 'next/image'
import back from "@/public/images/pro.webp"
import Link from 'next/link'


const Radialchart = () => {
  const [data,setdata]=useState([])
  const [total,settotal]=useState("")
    const fetchdata=async()=>{
      const response=await GetUsersAdminAPI()
      if(response?.status===200){
        setdata(response?.userData)
        settotal(response?.totalCount)
      }
    }
   useEffect(()=>{
      fetchdata()
   },[])
  return (
    <div>
    <div className="max-w-sm w-full h-[95%] overflow-x-hidden bg-white rounded-lg shadow-md shadow-gray-600 dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex  flex-col ">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Users</h5>
            <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
            </svg>
          </div>
          <div className='flex items-center'>
         <p className='text-sm text-gray-500 my-3 mr-2 ml-2'>Total Users :</p>
           <p className='text-gray-900 text-2xl font-bold  '>{total}</p>
          </div>
        </div>
      </div>
    
   
      <div className="p-2" id="radial-chart" >
        <div className='bg-gray-50  rounded-md'>
        <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    
                    <th scope="col" className=" py-3">
                    <Image
                     src={back}
                     alt='Loading..'
                     className="w-8 h-8 mx-1 rounded-full" 
                      /> 
                    </th>
                   
                </tr>
            </thead>
            <tbody>
                {data?.map((data:any,index:any)=>(
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div >
                            <div className="text-base font-semibold">{data?.fullName[0].toUpperCase()+data?.fullName.slice(1)}</div>
                            <div className="font-normal text-gray-500">{data?.email}</div>
                        </div>  
                    </th>
                </tr>

                ))}
              
            </tbody>
        </table>

        </div>
      </div>
    
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
        
          <Link
            href={"/admin/users"}
            className="uppercase text-sm  font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
            Explore more
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Radialchart