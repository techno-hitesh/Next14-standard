"use client"
import ProductCard from '@/app/(view)/dashboard/components/productCard'
import { GetAllProductAPI } from '@/app/services/apis/admin/products'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Products = () => {
    
    const [usrProducts, setUsrProducts] = useState("")

    const handleProducts = async() =>{
        const data = await GetAllProductAPI();
        setUsrProducts(data?.data)
        console.log(data.data)
    }
    
    useEffect(()=>{
      handleProducts();
    },[])
  return (
    <>
     <div className='flex justify-between'>
    <form >   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    
        </div>
    </form>
    <Link href={'/admin/products/create'}>
     <button className='bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700'>Create Product</button>
     </Link>
     </div>
    <section id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
  { usrProducts ?
      <ProductCard  usrProducts={usrProducts}/>
          :"Loading.."
    }
    
</section>
    
    
    </>
  )
}

export default Products