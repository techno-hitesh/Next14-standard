"use client"
import React, { useEffect, useState } from 'react'
import "../../style/productCard.css"
import "../../style/style.css"
import { GetProductByIdAPI } from '@/app/services/apis/admin/products'
import Image from 'next/image'
import { AddtoWishlistAPI, addToCartAPI,getAllReviwAPI,getToCartAPI } from '@/app/services/apis/user'
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'
import { dashboardLinks } from '@/app/configs/authLinks'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const ProductDesp = ({ params }: { params: { id: any | string } }) => {

  const router = useRouter();
  const pathname = usePathname()
  const [value, setValue] = useState()
  const [productData, setProductData] = useState<any>()
  const [selectedImage, setSelectedImage] = useState<any>([]);
  const [itemGet, setItemGet] = useState(false)
  const [quantity,setQuantity] =  useState("")
  const [review,setreview]=useState<any>([])

  const products = async () => {
    try {
      const res = await GetProductByIdAPI(params.id);
      if(res.status == 200 && res.message === "Product found successfully"){
        // console.log("*****",res.getProduct.productStockQuantity)
        if(res.getProduct.productStockQuantity <=10){
          setQuantity(res.getProduct.productStockQuantity)
        }
        
        setProductData(res.getProduct)
        setSelectedImage(res?.getProduct.productImg[0])
      }
    } catch (error) {
        console.log("error products --",error);
    }
  }

  const handleImageClick = (image:any) => {
    setSelectedImage(image);
    };


    const getAllreview=async()=>{
      const response=await getAllReviwAPI(params.id)
      if(response?.status===200){
        console.log(response.data)
        setreview(response?.data)
      }else{
        console.log("error")
      }
    }
  const ItemInCart = async () => {
    try {
      const resp = await getToCartAPI()
      if (resp.status == 200) {

        const datas = resp.data.cartItems.filter((data:any)=>{
          if(data.message !== "Product not found"){
              return data
          }       
        })
  
        datas.map((e:any)=>{
          if(e.productDetails.productId === params.id){
            setItemGet(true);
          }
        })       
      }
      
    } catch (error) {
      console.log("error ItemInCart --",error);
    }
  }

  const handleAddToCart = async () => {
    try {
      const param = {
        "productId": productData._id,
        "productName": productData.productName
      }
      const resp = await addToCartAPI(param)
      if (resp.status == 201) {
        router.replace(dashboardLinks.cartsLink)
      } 
    } catch (error) {
      console.log("error handleAddToCart --",error);
    }
   
  }
 const AddtoWishlist=async(id:any)=>{
  const data={
    productId:id
  }
  const response=await AddtoWishlistAPI(data)
  if(response?.status===201){
    toast.success("Product Added to Wishlist !")
  }else{
    toast.error(response?.message)
  }
 }
  const handleGoToCart = async () => {
    router.replace(dashboardLinks.cartsLink)
  }

  useEffect(() => {
    ItemInCart()
    products()
    getAllreview()
  }, [])

  return (
    <>
      {productData ?

        <div>
          <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[400px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={selectedImage} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                {itemGet == false ?
                        <button  onClick={handleAddToCart} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                        :
                        <button  onClick={handleGoToCart} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Go to Cart</button>  
                        }
                    </div>
                    <div className="w-1/2 px-2">
                        <button  onClick={()=>AddtoWishlist(productData?._id)} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2"> {productData.productName[0].toUpperCase()+productData.productName.slice(1)}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">₹ {productData.productPrice}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                        <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                </div>
              
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                       {productData?.productDescription}
                    </p>
                </div>
                <div className='flex  gap-3 overflow-auto'>
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
        </div>

        <div  className='flex flex-col my-24 border border-gray-100 p-4'>
          <div className='flex justify-between items-center'>
          <h1 className='text-2xl my-6 font-bold'>Reviews</h1>
          {/* <button className='text-yellow-600 font-bold text-xl bg-yellow-50 rounded-md px-2 py-1 hover:shadow-lg'>Add Review</button> */}
          </div>
        {review && review?.length>0 ? review.map((data:any,index:any)=>(
        <div  key={index}className="flex items-start">
  <div className="flex-shrink-0">
    <div className="inline-block relative">
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={data?.userId?.profileImg} alt="Profile picture"/>
        <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
      </div>
      <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"/>
      </svg>
    </div>
  </div>
  <div className="ml-6">
    <p className="flex items-baseline">
      <span className="text-gray-600 font-bold">{data?.userId?.fullName[0].toUpperCase()+data?.userId?.fullName.slice(1)}</span>
      <span className="ml-2 text-green-600 text-xs">Verified Buyer</span>
    </p>
    <div className="flex items-center mt-1">
    <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.5} readOnly />
    </div>
    <div className="flex items-center mt-4 text-gray-600">
      <div className="flex items-center">
        <span className="text-sm">Rating</span>
        <div className="flex items-center ml-2">
        <Rating name="half-rating-read" defaultValue={data?.rating} precision={0.5} readOnly />
        </div>
      </div>
     
    </div>
    <div className="mt-3">
      <span className="font-bold">Description</span>
      <p className="mt-1">{data?.comment}</p>
    </div>
    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
      <button className="flex items-center">
        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z"/></svg>
        <span className="ml-2">Share</span>
      </button>
   
    </div>
  </div>
</div>
))    : "No reviews !"}
        </div>
<ToastContainer/>
        </div>

        : "loading...."}

    </>
  )
}

export default ProductDesp
