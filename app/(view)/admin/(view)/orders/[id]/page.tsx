"use client"
import { getPaymentsById } from '@/app/services/apis/payment'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import moment from 'moment-timezone';

const OrderById = () => {
    const {id}:any=useParams()
    const [pending,setpending]=useState(true)
    const [orderdetail,setorderdetail]=useState<any>([])
    const fetchdetail=async()=>{
      const response=await getPaymentsById(id)
      if(response?.status===200){
        setorderdetail(response?.payment)
        setpending(false)
             
    }
  }

const formatDateAndTime = moment(orderdetail?.createdAt).format("DD-MM-YYYY h:mm A")
const dateTimeFormat = formatDateAndTime.split(" ");
      const date = dateTimeFormat[0];
      const time = dateTimeFormat[1];
      const dayTime = dateTimeFormat[2];

    useEffect(()=>{
      fetchdetail()
    },[])
  return (
    
    <div>
      {pending ? "Loading....." :
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #{orderdetail?.orderNumber}</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600"> {date} at {time} {dayTime}</p>
            </div> 
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                        {orderdetail?.totalProduct?.map((data:any,index:any)=>(

                        <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div className="pb-4 md:pb-8  w-full md:w-40">
                                <img className="w-full hidden md:block" src={data?.productImageUrl} alt="dress" />
                                <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{data?.productName}</h3>
                                    {/* <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Style: </span> Italic Minimal Design</p>
                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Size: </span> Small</p>
                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Color: </span> Light Blue</p>
                                    </div> */}
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base dark:text-white xl:text-lg leading-6"> ₹{data?.productPrice}</p>
                                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{data?.productQuantity}</p>
                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"> ₹{data?.itemPrice}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Contact Number </p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderdetail?.addressDetails?.mobileNumber}</p>
                                </div>
                              
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Products</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{orderdetail?.totalProduct?.length}</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                {orderdetail?.totalProduct?.map((data:any,index:any)=>(
                                <div key={index} className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">{data?.productName}</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">₹{data?.itemPrice}</p>
                                </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600"> ₹{orderdetail?.totalCartAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{orderdetail?.buyerUserDetails?.fullName[0].toUpperCase()+orderdetail?.buyerUserDetails?.fullName.slice(1)}</p>
                                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">{orderdetail?.totalProduct?.length} Orders</p>
                                </div>
                            </div>
    
                            <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email"/>
                                <img className="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email"/>
                                <p className="cursor-pointer text-sm leading-5 ">{orderdetail?.buyerUserDetails?.email}</p>
                                
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{orderdetail?.addressDetails?.cityName},<br />{orderdetail?.addressDetails?.stateName}. <br /> {orderdetail?.addressDetails?.country[0].toUpperCase()+orderdetail?.addressDetails?.country.slice(1)} {orderdetail?.addressDetails?.areaPincode}.</p>
                                </div>
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{orderdetail?.addressDetails?.cityName},<br />{orderdetail?.addressDetails?.stateName}. <br /> {orderdetail?.addressDetails?.country[0].toUpperCase()+orderdetail?.addressDetails?.country.slice(1)} {orderdetail?.addressDetails?.areaPincode}.</p>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>}
    </div>
  )
}

export default OrderById