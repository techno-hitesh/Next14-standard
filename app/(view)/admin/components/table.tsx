import { AllPaymentsAdminApi } from "@/app/services/apis/admin/charts";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

const TableReact = () => {
    const [products,setproducts]=useState([])
    const [pending,setpending]=useState(true)
    const fetchdata=async()=>{
        const response=await AllPaymentsAdminApi()
        setproducts(response?.payments)
        setpending(false)
    }
    useEffect(()=>{
        fetchdata()
    },[])

  const TableRows = ({ data }:{data:any}) => {

    return (
      <>
      
        <tr className="cursor-pointer">
          <td
            className={`py-2 px-3 font-normal text-base text-center border-t whitespace-nowrap`}
          >
            {data?.buyerUserId?.fullName[0].toUpperCase()+data?.buyerUserId?.fullName.slice(1)}
          </td>
          <td
            className={`py-2 px-3 font-normal text-base text-center border-t whitespace-nowrap`}
          >
           {data?.totalProduct.length}
          </td>
          <td
            className={`py-2 px-3 text-base  font-normal text-center border-t min-w-[250px]`}
          >
            {data?.paymentStatus}
          </td>
          <td
            className={`py-5 px-3 text-base  text-center  border-t font-normal `}
          >
            {"" + data?.totalCartAmount}
          </td> 
          <td  className={`py-2 px-3 text-base text-center text-blue-400  font-normal border-t min-w-[100px]`}>
          <FaEye className="block  mx-auto"/>
          </td>
        </tr>
        
    
      </>
    );
  };
  return (
    <div>
     { !pending ?
    <div className="min-h-screen ml-10 h-full  bg-white flex flex-col items-center justify-center py-10 ">
      <div className=" max-w-4xl px-2">
        <h1 className="text-3xl font-bold my-3">Orders : </h1>
        <div className="w-[140%] overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto   overflow-scroll  md:overflow-auto w-full font-inter border-separate border-spacing-y-0 borer ">
            <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
              <tr className="ps-4">
                <th className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Name
                </th>
                <th className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Products
                </th>
                <th className="py-3 px-3 w-[15%] text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Payment
                </th>
                <th className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap  ">
                  Total Amount
                </th> 
                <th className="py-3 px-3  text-[#212B36] sm:text-base font-bold whitespace-nowrap  ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((data, index) => (
                <TableRows key={index} data={data} />
              ))}
              <tr>
                <td colSpan={6} className="border-t"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      </div>
      :"Loading....." }
      </div>
  );
};
export default TableReact;
