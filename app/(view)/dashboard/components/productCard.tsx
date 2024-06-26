"use client"
import Image from 'next/image'
import React, { MouseEvent, useEffect, useState } from 'react';
import { ProductTypeProps ,ProductType} from '@/app/types/userTypes';
import '../style/style.css';
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { adminLinks, dashboardLinks } from '@/app/configs/authLinks';
import auth from '@/app/configs/auth';
import { jwtDecodeData } from '@/app/helpers';

const ProductCard = (usrProducts:ProductTypeProps|any) => {
    const router = useRouter();
    const pathname = usePathname()
    var role : any;
    // console.log('usrProducts',usrProducts.usrProducts)
    
    const [links,setLinks] =useState("")
    const {products} = usrProducts.usrProducts;

    const handleCart = (e: MouseEvent<HTMLButtonElement>,product:ProductType) =>{
       
        router.replace(`${pathname}/${product}`)
    }

    const getrole=()=>{
      const token=localStorage.getItem(auth.storageRole)
      const decodeRole:any=jwtDecodeData(token)
        role=decodeRole
        const link = role==="user" ? dashboardLinks.productsLink : adminLinks.productsLink
        setLinks(link);
    }

   
    useEffect(()=>{
      getrole()
setTimeout(()=>{

  console.log("sdfsdf",links)
},1000)

    },[])
  return (
    <>
        {products && products  ? 
      
        products.map((data:any,i:any)=>(     
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={data._id}>
           
            <Link href={links+"/"+data._id}>
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
                  

                    {/* <p className='font-thin text-sm my-2'>{data.productDescription[0].toUpperCase()+data.productDescription.slice(1)}</p> */}
                    
                    {/* <div className="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span className="text-2xl font-bold text-slate-900">₹{data.productPrice}</span>
        <span className="text-xs text-slate-900 line-through">₹{data.productPrice-40}</span>
      </p>
      <div className="flex items-center">
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
      </div> */}
    {/* </div> */}
                    <div className="flex items-center">
                    {/* <button className="custom-button-primary" onClick={(e)=>handleCart(e,data._id)} >
                    Preview...</button>  */}
                        {/* <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                        <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                        </del> 
                       <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                <path
                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg></div> */}
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


{/* <div className="max-w-xs bg-white border border-gray-200 rounded-lg dark:border-gray-700 ml-3" key={data._id} >
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
{/* <button className="custom-button-primary" onClick={(e)=>handleCart(e,data._id)} >
    Read more...</button>                  */}
{/* <CusModal /> */}

// </div>  

// </div> 