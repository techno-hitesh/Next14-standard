"use client"
import React,{useEffect, useState} from 'react'
import { getPaymentsById } from '@/app/services/apis/payment'
import Images from "@/public/images/t1.jpg";
import Image from 'next/image';
import FileDownloader from '../components/pdf';
import Link from 'next/link';

const OrderByIdView = ({ params }: { params: { id: any | string } }) => {
    console.log("params sdfsdf-- ",params.id)    

    const [orderVal,setOrderVal] = useState<[]|any>("")
    const [dateTime,setDateTime] = useState("")

    const handlePaymentsId = async() =>{
        const resp = await getPaymentsById(params.id);
        if(resp.status == 200){
            console.log("resp---",resp.payment);
            setOrderVal(resp.payment)
            const date = new Date(resp.payment.createdAt);

            // Format the date according to the locale
            const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            });
            setDateTime(formattedDate)
        }
  }

    useEffect(()=>{
        handlePaymentsId();
    },[])

  return (
    <>

{orderVal && orderVal!=="" ? 

  <section id="Projects"
  className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

  {orderVal.totalProduct.length > 0 ? 
    orderVal?.totalProduct.map((data:any, i:number) => (

      <div key={i} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"> 
            <Link href={`/dashboard/products/${data?.productId}`}>
            <img src={data?.productImageUrl}
                    alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            </Link>
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate block capitalize">  {data?.productName}</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3"> ₹{data?.productPrice}</p>
                    {/* <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2"> ₹12030</p>
                    </del> */}
                     <div className="ml-auto">
                     Qty {data?.productQuantity}
                     </div>
                </div>
                <Link href={`/dashboard/review/${data?.productId}`}>
                
                     <button className='text-md font-semibold bg-gray-200  rounded-md px-2 py-1 text-black'>Add Review</button>
                </Link>
            </div>       
    </div>

      
      //   <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={data._id} >

      //   <div className="row g-0">
      //     <div className="col-md-4">
      //     <Image src={data?.productImageUrl} className="img-fluid rounded-start" alt="" width={0} height={0} sizes="100vw" style={{objectFit: "cover", height: "50%", width: "30%"}}/>
      //     </div>
      //     <div className="col-md-8">
      //       <div className="card-body">
      //         <h5 className="card-title">Product Name : {data?.productName}</h5>
      //         <p className="card-text">Product Description : {data?.productDescription}</p>
      //         <p className="card-text">Buyer Name : {orderVal.buyerUserDetails.fullName}</p>
      //         <p className="card-text"><small className="text-muted">{dateTime ? dateTime : ""}</small></p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )) 
  : ""}

<div className="card mb-3 mr-3" style={{maxWidth: "540px"}}>
    <div className="card-body">
      {/* <h3 className="card-text"> Invoice Download</h3> */}
      <FileDownloader data={params}/>
    </div>
  </div>
</section>


:"Please wait.."}
      
    </>
  )
}

export default OrderByIdView