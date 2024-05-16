"use client"
import ProductCard from '@/app/(view)/dashboard/components/productCard'
import { GetAllProductAPI } from '@/app/services/apis/admin/products'
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