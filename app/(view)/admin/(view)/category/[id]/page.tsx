"use client"
import { getcategorybyidAPI } from '@/app/services/apis/admin/products'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CategoryDelete from '../../../components/categoryDelete'
import CategoryUpdate from '../../../components/categoryUpdate'

const Page = () => {
    const {id}:any=useParams()
    const [categorydata,setcategoryData]=useState<any>({})
    const fetchCategory=async()=>{
        const response=await getcategorybyidAPI(id)
         console.log(response?.data)
         setcategoryData(response?.data)
    }

    const handleUpdateSuccess=async()=>{
        const response=await getcategorybyidAPI(id)
        if(response?.status===200){
            fetchCategory()
        }
    }
    useEffect(()=>{
    fetchCategory()
    },[])
  return (
    <div>

{categorydata ?
    <div className="bg-gray-100 dark:bg-gray-800 py-8 ">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                
                <img className="w-full h-full object-cover" src={categorydata?.categoryImg} alt="Product Image"/>
            </div>
            <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                    <CategoryDelete id={categorydata?._id}/>
                </div>
                <div className="w-1/2 px-2">
                    <CategoryUpdate id={categorydata?._id} onUpdateSuccess={handleUpdateSuccess} />
                </div>
            </div>
        </div>
        <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{categorydata?.categoryName}</h2>
          
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Category Description:</span>
                <p className="text-gray-600 dark:text-gray-300 text-md mt-2">{categorydata?.categoryDescription}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                    lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                    ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                    sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                </p>
            </div>
        </div>
    </div>
</div>
   </div>
  
:"Loading...."
}
</div>
  )
}

export default Page