"use client"
import Image from 'next/image'
import React, { MouseEvent, useState } from 'react';
import { ProductTypeProps ,ProductType} from '@/app/types/userTypes';
import '../style/style.css';
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'

const ProductCard = (usrProducts:ProductTypeProps|any) => {
    const router = useRouter();
    const pathname = usePathname()

    // console.log('usrProducts',usrProducts.usrProducts.products,pathname)
    const {products} = usrProducts.usrProducts;

    const handleCart = (e: MouseEvent<HTMLButtonElement>,product:ProductType) =>{
       
        router.replace(`${pathname}/${product}`)
    }
  return (
    <>
        {products && products  ? 
      
        products.map((data:any,i:any)=>(      
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg dark:border-gray-700 ml-3" key={data._id} >
                <Image 
                 className="rounded-t-lg"
                 src={data?.productImg}
                 alt="" 
                 width={0}
                 height={0}
                 sizes="80vw"
                 style={{ width: '50%', height: '50%' }} 
                 />
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-light text-gray-900 dark:text-dark">
                    {data.productName}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-dark-700 dark:text-neutral-400">Description : {data.productDescription}</p>

                {/* {/* <button className="btn btn-blue" onClick={(e)=>handleCart(e,product,i)}>
                {proVal[product._id] || 0} Add to Cart</button> */}
                <button className="custom-button-primary" onClick={(e)=>handleCart(e,data._id)} >
                    Read more...</button>                 
                {/* <CusModal /> */}
              
            </div>  
            
        </div>
      
    ))

    : "Loading...."
    }

 </>
  )
}

export default ProductCard
