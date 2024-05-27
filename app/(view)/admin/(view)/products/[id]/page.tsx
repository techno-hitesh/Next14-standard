"use client"
import { GetProductByIdAPI, deleteadminproductApi } from '@/app/services/apis/admin/products'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ModalDelete from '../../../components/modal'
import Link from 'next/link'
import UpdateModal from '../../../components/updateModal'
import { ToastContainer } from 'react-toastify'

const ProductById = () => {
    const {id}=useParams()
    const router=useRouter()
    const [selectedImage, setSelectedImage] = useState<any>([]);
    const [productData,setProductData]=useState<any>()
    //fetching product data (specific product data through id)
     const fetchdata=async()=>{
        const response=await GetProductByIdAPI(id)
        if(response?.status===200){
            console.log(response?.getProduct)
           setSelectedImage(response?.getProduct.productImg[0])
            setProductData(response?.getProduct)
        }
    }
     
    const handleUpdateSuccess=async()=>{
        const response=await GetProductByIdAPI(id)
        if(response?.status===200){
            // console.log('handlesuccess',response)
            fetchdata()
        }
    }



const handleImageClick = (image:any) => {
setSelectedImage(image);
};
    useEffect(()=>{
     fetchdata()
    },[])
  return (
    <>
    <div>
        {productData ? 
        <div className="bg-gray-100 dark:bg-gray-800 py-8 ">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={selectedImage} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                      <ModalDelete id={productData?._id} />
                    </div>
                    <div className="w-1/2 px-2">
                        <UpdateModal id={productData?._id} onUpdateSuccess={handleUpdateSuccess} />
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{productData.productName}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {productData.productDescription}
                </p>
                <label htmlFor="Brand" className='text-gray-800 font-bold text-lg'>Brand </label>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {productData.productBrand}
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">₹{productData.productPrice}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                        <span className="text-gray-600 dark:text-gray-300">{productData.productStockQuantity}</span>
                    </div>
                </div>
                <div className='my-4'>

                <span className="font-bold text-gray-700 dark:text-gray-300">Product Features :</span>
                <span className="text-gray-600 dark:text-gray-300 ">{productData.productFeature}</span>

                </div>
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                </div>
                <div className='flex gap-3 overflow-auto'>
                {productData?.productImg?.map((image:any, index:any) => (
                    <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index}`}
                    className={`cursor-pointer border ${selectedImage === image ? 'border-blue-500' : 'border-transparent'}`}
                    style={{ width: '100px', height: 'auto' }}
                    onClick={() => handleImageClick(image)}
                    />
                    ))}
                </div>
            </div>
        </div>
    </div>
    <ToastContainer/>
       </div>
    :"Loading..........."    
    }
    </div>

    </>
  )
}

export default ProductById