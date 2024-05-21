"use client"
import { Getallcategories } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { ToastContainer } from 'react-toastify';

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
    <div className='w-[130%] relative '>
   <div>
    <div className='flex justify-between items-center'>
<h1 className='text-3xl font-bold my-5'>Categories :</h1>
<Link href={'/admin/category/categorycreate'}>
<button className='bg-blue-800 rounded-md text-white px-3 py-2'>Create Category</button>
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
            {categories?.map((category: { categoryName: string, _id:any,categoryDescription:string}, index:any) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-center whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                    <Link  href={`/admin/category/${category?._id}`}>
                        {category.categoryName}
                    </Link> 
                    </td> 
                    <td className="px-6 py-4 text-center"> 
                        {category.categoryDescription}
                    </td>
                    <td className="px-6 py-4 flex space-x-2 text-center">
                      <Link className='bg-blue-800 text-white rounded-md px-3 py-2' href={`/admin/category/${category?._id}`}>
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

export default CategoryPage


