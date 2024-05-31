import React, { useState,useEffect } from "react";
import { getAddressByIdAPI } from "@/app/services/apis/address";
import { getToCartAPI,getItemInCartAPI} from "@/app/services/apis/user";
import { useSelector } from "react-redux";
import { jwtDecodeData } from "@/app/helpers";
import { loadStripe } from '@stripe/stripe-js';
import { stripeSessionAPI } from "@/app/services/apis/user";
import { addressType } from "@/app/types/userTypes";
import {DelIcon} from "@/public/svg/del"
import {EditIcon} from "@/public/svg/edit"
import { AddIcon } from "@/public/svg/add";
// import { ModalCompo } from "./modal";
import { delAddressByIdAPI } from "@/app/services/apis/address";
import authConfig from '@/app/configs/auth';

export default function PlaceOrder(checkBoxId:{checkBoxId:string}) {
  // console.log("chekced id ---",checkBoxId.checkBoxId)

  const publishableKey:string|any =  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

  const UserDataName = useSelector((data:any)=> data.users);

  const [getAllData, setGetAllData] = useState<any|[]>([])
  const [subTotal, setSubTotal]     = useState("")
  const [addressData, setAddressData] = useState<addressType|any>("")
  const [userName,setUserName] = useState("")
  const [userCartId,setUserCartId] = useState("")


  //get user from redux
  const getUserData = ()=>{
    if (UserDataName !="" && typeof UserDataName?.users?.data === 'string') {
        const decodedData:any = jwtDecodeData(UserDataName?.users?.data);
        setUserName(decodedData?.fullName)
    }

    if (UserDataName !="" && typeof UserDataName?.cartId?.data === 'string') {
      const decodedData:any = jwtDecodeData(UserDataName?.cartId?.data);
      setUserCartId(decodedData)
    }

  }
  
// all data in cart
  // const getAllCart = async () => {

  //   const cart = localStorage.getItem(authConfig.storageCart);
  //   const localCartId = jwtDecodeData(cart);
  //   const userCartIds:any = userCartId ? userCartId : localCartId;
  //   console.log("local cart place oerder",userCartIds)

  //   if(userCartIds !=""){

  //     const resp = await getItemInCartAPI(userCartIds)
  //     if (resp.status == 200) {
  //         const datas = resp.data.cartItems.filter((data:any)=>{
  //           if(data.message !== "Product not found"){
  //               return data
  //           }
  //         })
  //         // console.log("datas",datas)
  //         setGetAllData(datas)
  //         setSubTotal(resp.data.totalCartAmount);
  //       }

  //   }else if(userCartId == "" || undefined){
  //       const resp = await getToCartAPI();
  //       if (resp.status == 200) {
  //         const datas = resp.data.cartItems.filter((data:any)=>{
  //           if(data.message !== "Product not found"){
  //               return data
  //           }
  //         })
  //         setGetAllData(datas)
  //         setSubTotal(resp.data.totalCartAmount);
  //       }
  //   }
    
  // }

  const getAllCart = async () => {
    const cart = localStorage.getItem(authConfig.storageCart);
    const localCartId = jwtDecodeData(cart);
    const multiple=localStorage.getItem("multiple")
    let userCartIds:any = userCartId ? userCartId : localCartId;

    if(userCartIds !="" && multiple==="false"){
  
      const resp = await  getItemInCartAPI(userCartIds)
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

    }else if(multiple==="true"){
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
    
  }

  // get Address by ID
  const getAddressData = async() =>{
    try {
      const resp = await getAddressByIdAPI(checkBoxId.checkBoxId);
      if(resp.status == 200){
        // console.log("resp--",resp?.addressData)
        setAddressData(resp?.addressData)
      } 
    } catch (error) {
      console.log("address data --",error)
    }   
  }


  useEffect(() => {
    getUserData()
    getAddressData()
    getAllCart()
  }, [])


      // stripe payment functions...  
  const createCheckOutSession = async () => {
    console.log("getAllData--start",getAllData )

    const stripePromise = loadStripe(publishableKey);

    let formattedData
    if(getAllData.length ===1){
        formattedData = {
            totalProduct:[
                {
                    "cartId":getAllData[0]?._id,
                    "productId": getAllData[0]?.productDetails?.productId,
                    "productName": getAllData[0]?.productDetails?.productName,
                    "productPrice": getAllData[0]?.productDetails?.productPrice,
                    "productDescription": getAllData[0]?.productDetails?.productDescription,
                    "productQuantity":getAllData[0]?.quantity,
                    "itemPrice":getAllData[0]?.itemPrice
                }                
            ],
            "totalCartAmount": subTotal,
            "addressId":checkBoxId.checkBoxId
        }

    }else if(getAllData.length >1){
        const totalProduct  = getAllData.map((cartItem:any)=>(
            {
                "cartId":cartItem?._id,
                "productId": cartItem?.productDetails?.productId,
                "productName": cartItem?.productDetails?.productName,
                "productPrice": cartItem?.productDetails?.productPrice,
                "productDescription": cartItem?.productDetails?.productDescription,
                "productQuantity":cartItem?.quantity,
                "itemPrice":cartItem?.itemPrice
            }
        ))
        const totalCartAmount = subTotal
        const addressId = checkBoxId.checkBoxId
        formattedData = {
          totalProduct,
          totalCartAmount,
          addressId
        };
    }

    const stripe:any = await stripePromise;

    const checkoutSession = await stripeSessionAPI(formattedData);

    console.log("checkoutSession*********",checkoutSession,"********",checkoutSession.sessionId)
    if(checkoutSession.status == 201){
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.sessionId,            
        });

        if (result.error) {
          alert(result.error.message);
        }
    }    
  };

  const delAddressHandler = async(data:any) =>{
    // console.log(data._id);
    const resp = await delAddressByIdAPI(data?._id);
    if(resp.status == 200){
      getAddressData()
    }
    // console.log("dele----",resp)
  }


  return (
   
    <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Order Summary<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>

        <div className="flex items-center mt-5">
          <h3 className="text-lg font-semibold text-gray-500">Deliver to:</h3>

         {/* <button className="ml-auto bg-blue-500 text-white px-1 py-1 rounded mr-4"><AddIcon /> Add New Address</button>
           */}
        </div>


        <div className="flex items-center mt-1">
         <p className="mt-5 font-bold">{userName!="" ? userName: ""}</p>
         {/* <button className="ml-auto bg-gray-400 text-white px-1 py-1 rounded flex items-center"><EditIcon/></button>
         <button className="bg-red-400 text-white px-1 py-1 rounded flex items-center ml-2" type="submit" onClick={()=>delAddressHandler(addressData)}><DelIcon /></button> */}
         {/* <ModalCompo /> */}
        </div>

        <p className="mt-3">{addressData ? addressData?.mobileNumber :"no data"}</p>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
        {addressData?.streetAddress} , {addressData?.nearByAddress} <br />
        {addressData?.areaPincode}

        </p>
        <button type="submit" className="mt-10 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg" onClick={createCheckOutSession}>Payments </button>
    </div>
  );
}