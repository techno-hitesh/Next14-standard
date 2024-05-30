"use client"
import React, { useEffect, useState } from 'react'
import "../../style/productCard.css"
import "../../style/style.css"
import { GetProductByIdAPI } from '@/app/services/apis/admin/products'
import Image from 'next/image'
import { addToCartAPI,getToCartAPI } from '@/app/services/apis/user'
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'
import { dashboardLinks } from '@/app/configs/authLinks'
import Link from 'next/link'

const ProductDesp = ({ params }: { params: { id: any | string } }) => {

  const router = useRouter();
  const pathname = usePathname()

  const [productData, setProductData] = useState<any>()
  const [itemGet, setItemGet] = useState(false)
  const [quantity,setQuantity] =  useState("")

  const products = async () => {
    try {
      const res = await GetProductByIdAPI(params.id);
      if(res.status == 200 && res.message === "Product found successfully"){
        // console.log("*****",res.getProduct.productStockQuantity)
        if(res.getProduct.productStockQuantity <=10){
          setQuantity(res.getProduct.productStockQuantity)
        }

        setProductData(res.getProduct)
      }
    } catch (error) {
        console.log("error products --",error);
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

  const handleGoToCart = async () => {
    router.replace(dashboardLinks.cartsLink)
  }

  useEffect(() => {
    ItemInCart()
    products()
  }, [])

  return (
    <>
      {productData ?

        <div className="product-card">
                <img src={productData.productImg[0]}
                        alt="Product" className="h-72 w-72 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                    {/* <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span> */}
                    <div className="flex justify-between items-center">
                    {/* <p className="text-lg font-bold text-black truncate capitalize flex-grow">
                        {productData.productName}
                        <span className="font-bold" style={{float:"right"}}>
                        ₹ {productData.productPrice}
                        </span>
                    </p> */}
                  
                    </div>
                    <p className="product-card__brand ">{productData.productName}</p>
                    <h3 className='mt-3'>{quantity!="" ? `ONLY ${quantity} ITEMS IN STOCK` :""}</h3>
                    <p className="product-card__description mt-3">{productData.productDescription}</p>
                    <p className="product-card__price"> ₹ {productData.productPrice}</p>

                    {itemGet == false ?
                    <button className="custom-button-yellow" onClick={handleAddToCart}>Add To Cart</button>
                    :
                    <button className="custom-button-primary" onClick={handleGoToCart}>Go To Cart</button>
                  }
                            
                </div>

                <button className="product-card__btn-wishlist">
                  <svg viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
        </div>

        : "loading"}

    </>
  )
}

export default ProductDesp
