"use client"
import React, { useEffect, useState } from 'react'
import { getItemInCartAPI } from '@/app/services/apis/user'
import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from "../../components/checkoutForm"; 
import axios from 'axios';
import { getToCartAPI, updateCartItemAPI, delCartItemAPI, addToCartAPI, delCartQuantityAPI, stripeSessionAPI } from '@/app/services/apis/user'
import { useRouter } from "next/navigation"
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux"
import { addCartId } from '@/app/store/slices/userSlicer';
import { jwtEncodeData } from '@/app/helpers';
import { dashboardLinks } from '@/app/configs/authLinks';
import authConfig from '@/app/configs/auth';
import "@/app/style/style.css"

const CarTByID = ({ params }: { params: { id: any | string } }) => {

    const router = useRouter();

    const dispatch = useDispatch();

    const [cartItem, setCartItem] = useState<any | []>([])
    const [subTotal, setSubTotal] = useState("")

    const getCartById = async () => {
        const resp = await getItemInCartAPI(params.id)
        if (resp.status == 200) {
            setCartItem(resp.data.cartItems)
            setSubTotal(resp.data.totalCartAmount);
        }
    }


    const publishableKey: string | any = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    const stripePromise = loadStripe(publishableKey);


    const handleAddToCart = async (productData: any) => {
        const param = {
            "productId": productData.productId,
            "productName": productData.productName
        }
        const resp = await addToCartAPI(param)
        // // console.log("Increments--------", resp)
        if (resp.status == 200) {
            getCartById();
            // console.log("Increments-----", resp)
            // router.replace("/dashboard/cart")
        }
    }


    const handleDelCartQuantity = async (id: any) => {

        const resp = await delCartQuantityAPI(id)
        if (resp.status == 200) {
            getCartById();
        }
    }

    const handleDelCartItem = async (id: string) => {

        // console.log("remove cart--",id)
        const resp = await delCartItemAPI(id);
        if (resp.status == 200) {
            getCartById();
            //   console.log("res del item--",resp)
        }
    }


    useEffect(() => {
        getCartById()
    }, [])


    const handleClose = () => {
        router.replace("/dashboard/products")
    }

    const handleCheckoutById = () => {
        try {
            const decode: any = jwtEncodeData(params.id);
            dispatch(addCartId(decode))
            localStorage.setItem(authConfig.storageCart, decode)
            localStorage.setItem("multiple", "false")
            router.push(dashboardLinks.checkoutLinks);
        } catch (error) {
            console.log("handleCheckoutById ---", error);
        }
    }

    return (
        <>

            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-xl">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">

                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={handleClose} >
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                    {cartItem && cartItem.length > 0 ? cartItem.map((data: any) => (


                                                        <div key={data?.productDetails?.productId}>

                                                            <li className="flex py-6" >
                                                                <Link href={`/dashboard/products/${data?.productDetails?.productId}`}>
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img src={data?.productDetails.productImage[0]} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                                                    </div>
                                                                </Link>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href="#">{data?.productDetails?.productName}</a>
                                                                            </h3>
                                                                            <p className="ml-4">₹{data?.productDetails?.productPrice}</p>
                                                                        </div>
                                                                        {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500 font-bold">
                                                                            <button data-action="decrement" className=" mr-1 bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-10 rounded-l cursor-pointer outline-none" disabled={data?.quantity === 1 ? true : false} onClick={() => handleDelCartQuantity(data._id)} >
                                                                                <span className="m-auto text-2xl font-thin">−</span>
                                                                            </button>

                                                                            Qty {data?.quantity}
                                                                            <button
                                                                                data-action="decrement"
                                                                                className="ml-1 bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-10 rounded-l cursor-pointer outline-none"
                                                                                onClick={() => handleAddToCart(data?.productDetails)} // Pass parameters if needed
                                                                            >
                                                                                <span className="m-auto text-2xl font-thin">+</span>
                                                                            </button>
                                                                        </p>

                                                                        <div className="flex">
                                                                            <button type="button" className="font-medium custom-text-color" onClick={(e) => handleDelCartItem(data?._id)}>Remove</button>
                                                                        </div>
                                                                        {/*
        <button type="button" className="font-medium text-yellow-600 ml-1 hover:text-indigo-500" onClick={(e)=>handleBuySingleCart(data?._id)}> Buy This Now</button>
       
      </div> */}

                                                                    </div>

                                                                </div>
                                                            </li>

                                                        </div>


                                                    )) : "Empty Cart..."}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            {subTotal != "" ? <p>₹{subTotal}</p> : "Loading...."}

                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        {/* <PaymentElement /> */}
                                        <div className="mt-6">

                                            <button className="flex items-center justify-center rounded-md border border-transparent custom-bg-color w-full px-6 py-3 text-base font-medium text-white shadow-sm " onClick={handleCheckoutById}>Checkout</button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-1 py-1 sm:px-1">
                                        <div className="mt-6 flex justify-center text-center text-lg text-gray-500">
                                            <p className='text-black font-semibold'>
                                                or&nbsp;
                                                <Link href="/dashboard" className="font-medium custom-text-color ">
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CarTByID
