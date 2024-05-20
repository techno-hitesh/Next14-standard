import React, { useState,useEffect } from "react";
import { getAddressByIdAPI } from "@/app/services/apis/address";
import { getToCartAPI } from "@/app/services/apis/user";

export default function placeOrder(checkBoxId:{checkBoxId:string}) {
  console.log("chekced id ---",checkBoxId.checkBoxId)


  const [getAllData, setGetAllData] = useState<any|[]>([])
  const [subTotal, setSubTotal]     = useState("")
  const [addressData, setAddressData]     = useState("")

  
// all data in cart
  const getAllCart = async () => {
    const resp = await getToCartAPI();
    if (resp.status == 200) {
      const datas = resp.data.cartItems.filter((data:any)=>{
        if(data.message !== "Product not found"){
            return data
        }
      })
      // console.log("datas",datas)
      setGetAllData(datas)
      setSubTotal(resp.data.totalCartAmount);
    }
  }


  const getAddressData = async() =>{
    try {
      const resp = await getAddressByIdAPI(checkBoxId.checkBoxId);
      if(resp.status == 200){
        console.log("resp--",resp)
        setAddressData(resp?.addressData)
      }      

    } catch (error) {
      console.log("address data --",error)
    }   
  }


  useEffect(() => {
    getAddressData()
    getAllCart()
  }, [])



  return (
   
    <div>
        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Order Summary<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>

        <h3 className="text-lg font-semibold text-gray-500 mt-5">Address</h3>


        <p className="mt-5">{addressData ? addressData?.mobileNumber :"no data"}</p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
         {addressData ? addressData?.mobileNumber :"no data"}

        </p>
    </div>
  );
}