"use client"
import { Getallcategories } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

let val={
    categoryName:"",
    categoryDescription:'',
    categoryImg:""

}
const CategoryPage = () => {
  const [categories,setcategories]=useState<any>([])
    const getallcategories=async()=>{
        const response=await Getallcategories()
        if(response?.status===200){
            console.log(response?.data)
            setcategories(response?.data)
        }
    }
    useEffect(()=>{
        getallcategories()
    },[])
   
  return (
    <>
      <div className='my-5  flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>All categories</h1>
        <Link href={'/admin/category/categorycreate'}>
        <button className='bg-blue-800 text-white rounded-md px-3 py-2'>Create Category</button>
        </Link>       
      </div>
    
      <div className='grid grid-cols-4  gap-5'>
      {categories?.map((category: { categoryName: string ,_id:string,categoryDescription:string,categoryImg:string},index:any)=>(
        <div key={index} className="max-w-sm relative  shadow-gray-500 bg-white border w-full  border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
         <a href="#">
        <img className="rounded-t-lg w-full h-[60%]"   src={category?.categoryImg} alt={category?.categoryName} />
    </a>
    <div className="p-5 ">
        <a href="#">
            <h5 className="mb-2 my-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">{category?.categoryName}</h5>
        </a>
      
        <Link href={`/admin/category/${category?._id}`} className="inline-flex items-center px-3 absolute bottom-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
        </div>    
 ))}
      </div>
    </>
  )
}

export default CategoryPage


