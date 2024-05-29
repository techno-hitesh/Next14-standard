"use client"
import { Getallcategories } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { ToastContainer } from 'react-toastify';
import { FaEye } from 'react-icons/fa';

let val={
    categoryName:"",
    categoryDescription:'',
    categoryImg:""

}
const CategoryPage = () => {
  const [categories,setcategories]=useState<any>([])
  const [pending,setpending]=useState(true)
  const [loadingId, setLoadingId] = useState(null);

  const handleLinkClick = (productId:any) => {
    setLoadingId(productId);
  }
    const getallcategories=async()=>{
        const response=await Getallcategories()
        if(response?.status===200){
            setcategories(response?.data)
            setpending(false)
        }
    }
    useEffect(()=>{
        getallcategories()
    },[])
   
  return (
    <>
    {pending ? "Loading..." :
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
                    Category
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
                    <Link
                            onClick={() => handleLinkClick(category?._id)}
                            href={`/admin/category/${category?._id}`}
                          >
                            {loadingId === category?._id ? (
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 block ml-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            ) : (
                              <FaEye className="block text-blue-500 ml-5" />
                            )}
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
   
    </div>}
    </>
  )
}

export default CategoryPage


