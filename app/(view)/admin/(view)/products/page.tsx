"use client"
import ProductCard from '@/app/(view)/dashboard/components/productCard'
import { GetAllProductAPI, getproductBySearch } from '@/app/services/apis/admin/products'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Search from '../../components/search'

const Products = () => {
    
    const [usrProducts, setUsrProducts] = useState("")
    const handleProducts = async() =>{
        const data = await GetAllProductAPI();
        setUsrProducts(data?.data)
    }

    useEffect(()=>{
      handleProducts();
    },[])
  return (
    <>

    <div className='flex ml-10 justify-center items-center'>
      <Search/>
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