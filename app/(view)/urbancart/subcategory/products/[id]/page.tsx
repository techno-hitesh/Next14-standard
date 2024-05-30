"use client"
import React,{useEffect,useState} from 'react'
import { getSubCateProductByIdAPI } from '@/app/services/apis/user/categories'
import Link from 'next/link'
import {urbancartLinks } from '@/app/configs/authLinks'

const subCateProducts = ({ params }: { params: { id: any | string } } ) => {
    const [subCatProduct, setSubCatProduct] = useState<any>("");

    const getData = async()=>{
      const resp = await getSubCateProductByIdAPI(params.id);
      setSubCatProduct(resp.data.Products);
      console.log("getSubCateProductByIdAPI ",resp.data.Products)
    } 
  
    useEffect(()=>{
      getData();
    },[]);


  return (
    <>
    <section id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
    {subCatProduct.length > 0  && subCatProduct  ? 
      
      subCatProduct.map((data:any,i:any)=>(     
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
</section>

</>

  )
}

export default subCateProducts