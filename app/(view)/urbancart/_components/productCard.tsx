"use client"
import React from 'react';
import { ProductTypeProps } from '@/app/types/userTypes';
import '../style/productCard.css'
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import {urbancartLinks } from '@/app/configs/authLinks';


const ProductCard = (usrProducts:ProductTypeProps|any) => {

    const {products} = usrProducts.usrProducts;

  return (
    <>
        {products && products  ? 
      
        products.map((data:any,i:any)=>(     
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={data._id}>
           
            <Link href={urbancartLinks.productsLink+"/"+data._id}>
                <img  src={data?.productImg[0]}
                        alt="Product" className="h-72 w-72 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                    <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-black truncate capitalize flex-grow">
                        {data.productName.split(',')[0]}
                        <span className="font-bold" style={{float:"right"}}>
                        ₹ {data.productPrice}
                        </span>
                    </p>
                    </div>
                   
                </div>
            </Link>
        </div>

      
    ))

    : "Loading...."
    }


 </>
  )
}

export default ProductCard

