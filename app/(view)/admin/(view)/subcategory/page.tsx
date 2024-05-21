"use client"
import {Getallsubcategory} from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'


const Subcategory = () => {

  const [subData,setsubData]=useState<any>([])
     
     const getallsubcategories=async()=>{
      const response=await Getallsubcategory()
      if(response?.status===200){
        setsubData(response?.data)
      }

     } 
    useEffect(()=>{
        getallsubcategories()
    },[])
  return (
    <>
    <div className='w-[110%] relative '>
   <div>
    <div className='flex justify-between items-center'>
<h1 className='text-3xl font-bold my-5'>Subcategories :</h1>
<Link href={'/admin/subcategory/createsubCategory'}>
<button className='bg-blue-800 rounded-md text-white px-3 py-2'>Create SubCategory</button>
</Link>

    </div>
      <div className='mt-4'>
      <div className="overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
    <table className="w-full text-sm text-gray-700 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Subcategory
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="bg-white  dark:bg-gray-900">
            {subData?.map((subcategory: { subCategoryName: string, _id:any,subCategoryDescription:string}, index:any) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-center whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                    <Link  href={`/admin/subcategory/${subcategory?._id}`}>
                        {subcategory.subCategoryName}
                    </Link> 
                    </td> 
                   
                    <td className="px-6 py-4 text-center"> 
                        {subcategory.subCategoryDescription}
                    </td>
                    <td className="px-6 py-4 flex space-x-2 text-center">
                      <Link className='bg-blue-800 text-white rounded-md px-3 py-2' href={`/admin/subcategory/${subcategory?._id}`}>
                        Read more
                      </Link>
                        
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>



      </div>
    <ToastContainer/>
    </div>
   
    </div>
    </>
  )
}

export default Subcategory