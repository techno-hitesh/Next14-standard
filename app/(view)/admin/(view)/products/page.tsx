"use client"
import { GetAllProductAPI } from '@/app/services/apis/admin/products'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Spiner from '../../components/spiner'


const Products = () => {
    
    const [usrProducts, setUsrProducts] = useState([])
    const [pending,setpending]=useState(true)
    const handleProducts = async() =>{
        const data = await GetAllProductAPI();
        if(data?.status===200){
         setpending(false)
          setUsrProducts(data?.data?.products)
        }
    }

    useEffect(()=>{
      handleProducts();
    },[])
  return (
    <>
    {!pending ? 
    <div>
    <div className='flex ml-5 justify-between items-center'>
      <h1 className='text-3xl font-bold my-5'>Products :</h1>
      <Link href={'/admin/products/create'}>
      <button className='bg-blue-800  text-white px-3 py-2 rounded-md'>Create Product</button>
      </Link>
    </div>
    <div className='mt-4 w-[110%]'>
      <div className="overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
    <table className="w-full text-sm text-gray-700 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                     Stock
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                  
                </th>
            </tr>
        </thead>
        <tbody className="bg-white  dark:bg-gray-900">
            {usrProducts?.map((product: { productName: string,productImg:string,productPrice:number,productStockQuantity:number, _id:any,productDescription:string}, index:any) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-center whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                    <Link  href={`/admin/products/${product?._id}`}>
                        {product?.productName}
                    </Link> 
                    </td> 
                    <td className="px-6 py-4 text-center"> 
                        {product.productDescription}
                    </td>
                    <td className="px-6 py-4 text-center"> 
                        {product.productStockQuantity}
                    </td>
                    <td className="px-6 py-4 text-center"> 
                        {product.productPrice}
                    </td>
                    <td className="px-6 py-4  text-center">
                      <Link className='bg-blue-800 text-white rounded-md px-3 py-2' href={`/admin/products/${product?._id}`}>
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
         : "Loading......" 
          }
    </>
  )
}

export default Products