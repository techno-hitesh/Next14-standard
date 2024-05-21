"use client"
import { Getallcategories, Getallsubcategory, createsubcategoryAPI } from '@/app/services/apis/admin/products'
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
    <div className='w-[120%] relative '>
   <div>
    <div className='flex justify-between items-center'>
<h1 className='text-3xl font-bold my-5'>Subcategories :</h1>
<Link href={'/admin/subcategory/createsubCategory'}>
<button className='bg-blue-800 rounded-md text-white px-3 py-2'>Create SubCategory</button>
</Link>

    </div>
{/* <div className='grid grid-cols-4  gap-5'>
    
      {  subData?.map((subcategory: { subCategoryName: string ,_id:string,subCategoryDescription:string,subCategoryImg:string},index:any)=>(
        <div key={index} className="max-w-sm relative  shadow-gray-500 bg-white border w-full  border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
         <a href="#">
        <img className="rounded-t-lg w-full h-[60%]"   src={subcategory?.subCategoryImg} alt={subcategory?.subCategoryName} />
    </a>
    <div className="p-5 ">
        <a href="#">
            <h5 className="mb-2 my-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">{subcategory?.subCategoryName}</h5>
        </a>
      
        <Link href={`/admin/subcategory/${subcategory?._id}`} className="inline-flex items-center px-3 absolute bottom-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
        </div>    
 )) }
      </div> */}
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
            {subData?.map((subcategory: { subCategoryName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; subCategoryDescription: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                        {subcategory.subCategoryName}
                    </td>
                    <td className="px-6 py-4 text-center"> {/* Added text-center class */}
                        {subcategory.subCategoryDescription}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Edit</a>
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Delete</a>
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
