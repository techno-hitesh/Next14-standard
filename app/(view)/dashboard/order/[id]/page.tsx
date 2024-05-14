"use client"
import React,{useEffect, useState} from 'react'
import { getPaymentsById } from '@/app/services/apis/payment'
import Images from "@/public/images/t1.jpg";
import Image from 'next/image';
import FileDownloader from '../components/pdf';

const orderByIdView = ({ params }: { params: { id: any | string } }) => {
    console.log("params -- ",params.id)    

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
<div className="card mb-3" style={{"maxWidth": "540px;"}}>
  <div className="row g-0">
    <div className="col-md-4">
      <Image src={Images} className="img-fluid rounded-start"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '28%', height: '50%' }}
        />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Product Name : {orderVal.totalProduct[0].productName}</h5>
        <p className="card-text">Product Description : {orderVal.totalProduct[0].productDescription}</p>
        <p className="card-text">Buyer Name : {orderVal.buyerUserDetails.fullName}</p>
        <p className="card-text"><small className="text-muted">{dateTime? dateTime :""}</small></p>
      </div>

      <div className="card-body">
        {/* <h3 className="card-text"> Invoice Download</h3> */}
        <FileDownloader data={params}/>
      </div>
    </div>
  </div>
</div>

:"Please wait.."}
      
    </>
  )
}

export default orderByIdView


{/* <div className="max-w-sm w-full lg:max-w-full lg:flex mt-10">
  <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${Images})` }} title="Woman holding a mug">
  </div>
  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div className="mb-8">
      
      <div className="text-gray-900 font-bold text-xl mb-2">Product Name : {orderVal.totalProduct[0].productName}</div>
      <p className="text-gray-700 text-base">{orderVal.totalProduct[0].productDescription}</p>
    </div>
    <div className="flex items-center">
      <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
      <div className="text-sm">
        <p className="text-gray-900 leading-none">{orderVal.buyerUserDetails.fullName}</p>
        <p className="text-gray-600">{orderVal.createdAt}</p>
      </div>
    </div>
  </div>
</div> */}