"use client"
import { getsubcategorybyidAPI } from '@/app/services/apis/admin/products'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SubCategoryDelete from '../../../components/subcategoryDelete'
import SubCategoryUpdate from '../../../components/subcategoryUpdate'

const Page = () => {
    const {id}:any=useParams()
    const [subcategorydata,setcategoryData]=useState<any>({})
    console.log(id)
    const fetchSubcategory=async()=>{
        const response=await getsubcategorybyidAPI(id)
         setcategoryData(response?.data)
         console.log(response?.data)
    }

    const handleUpdateSuccess=async()=>{
        const response=await getsubcategorybyidAPI(id)
        if(response?.status===200){
            fetchSubcategory()
        }
    }
    useEffect(()=>{
    fetchSubcategory()
    },[])
  return (
    <div>

    {subcategorydata ?
        <div className="bg-gray-100 dark:bg-gray-800 py-8 ">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={subcategorydata?.subCategoryImg} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <SubCategoryDelete id={subcategorydata?._id}/>
                    </div>
                    <div className="w-1/2 px-2">
                        <SubCategoryUpdate id={id} onUpdateSuccess={handleUpdateSuccess} />
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{subcategorydata?.subCategoryName}</h2>
              
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Subcategory Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-md mt-2">{subcategorydata?.subCategoryDescription}</p>
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