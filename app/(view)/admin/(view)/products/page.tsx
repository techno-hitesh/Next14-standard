"use client"
import ProductCard from '@/app/(view)/dashboard/components/productCard'
import { GetAllProductAPI, getproductBySearch } from '@/app/services/apis/admin/products'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const Products = () => {
    
    const [usrProducts, setUsrProducts] = useState("")
    const [searchProducts,setsearchProdcuts]=useState([])
    const [show,setshow]=useState(false)
    const [search,setsearch]=useState("")
    const handleProducts = async() =>{
        const data = await GetAllProductAPI();
        setUsrProducts(data?.data)
    }
    const handlesubmit=async(e:any)=>{
        e.preventDefault()
        const response=await getproductBySearch(search)
        if(response?.status==200){
            setshow(true)
            console.log(response)
             setsearchProdcuts(response?.data?.products)
            
        }
    }
    useEffect(()=>{
      handleProducts();
    },[])
  return (
    <>

    <div className='flex justify-around'>
        <div className='w-[50%] '>
            <form >
        <div
            className="relative flex"
            data-twe-input-wrapper-init
            data-twe-input-group-ref>
            <input
                type="search"
                className="peer block min-h-[auto] w-full rounded border border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Search"
                aria-label="Search"
                id="search-input"
                value={search}
                onChange={(e)=>setsearch(e.target.value)}
                aria-describedby="search-button" />

            <button  onClick={handlesubmit}
                className="relative z-[2] -ms-0.5 flex items-center bg-blue-400 rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-white rounded-md shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="submit"
                id="search-button"
                data-twe-ripple-init
                data-twe-ripple-color="light">
                <span  className="[&>svg]:h-5 [&>svg]:w-5">
                <svg  
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                </span>
            </button>
</div>

            </form>
      </div>
    <Link href={'/admin/products/create'}>
     <button className='bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700'>Create Product</button>
     </Link>
    </div>
    <section id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
  { usrProducts   ?
      <ProductCard  usrProducts={usrProducts}/>
          :"Loading......"
    }
    
    </section>
    
  <ToastContainer/>  
    </>
  )
}

export default Products