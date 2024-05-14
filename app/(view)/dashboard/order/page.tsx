"use client"
import React, { useEffect,useState } from 'react'
import { getAllPayments } from '@/app/services/apis/payment'
import { useRouter } from 'next/navigation';
import TableCompo from "./components/table";
import "@/app/(view)/dashboard/style/style.css"


const OrderPage = () => {

    const route = useRouter()
    const [orderData , setOrderData] = useState<any>([])

    const handlePayments = async() =>{
        const resp = await getAllPayments();
        if(resp.status == 200){
            console.log("resp---",resp.payments);
            setOrderData(resp.payments)
        }        
    }

    useEffect(()=>{
        handlePayments();
    },[])

    const handleView = (id:string) =>{
        console.log("hanlde view",id)
        route.replace("/dashboard/order/"+id)
    }


  return (
    <>

    {orderData && orderData.length > 0 ? 

        // <TableCompo orderData={orderData}/>
      

<div className="relative overflow-x-auto mt-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                Product Price
                </th>
                <th scope="col" className="px-6 py-3">
                Product Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
        </thead>
        <tbody>

        {orderData && orderData !== "" ? (
        orderData.map((dm:any, i:any) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={i}>
                   {dm.totalProduct[0]?.productName}
                </th>
                <td className="px-6 py-4">
                    {dm.totalProduct[0]?.productPrice}
                </td>
                <td className="px-6 py-4">
                    {dm.totalProduct[0]?.productQuantity}
                </td>
                <td className="px-6 py-4">
                    {dm.paymentStatus}
                </td>
                <td className="px-6 py-4">
                <button className="custom-button-primary" type="submit" onClick={()=>handleView(dm._id)}>View</button>
                </td>
            </tr>   
            
        ))) 
        
        : (
            <tr>
                <td >Please wait....</td>
            </tr>
            )}
        </tbody>
    </table>
</div>


    :"nothing data"}
 
    </>
  )
}

export default OrderPage
