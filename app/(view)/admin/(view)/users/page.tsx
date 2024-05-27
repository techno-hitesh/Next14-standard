"use client"
import { GetUsersAdminAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import Spiner from '../../components/spiner'

const Userpage = () => {
    const [users,sertusers]=useState([])
    const [pending,setpending]=useState(true)
    
    //getting all users
     const getAllUsers=async()=>{
      const response=await GetUsersAdminAPI()
      if(response?.status===200){
        sertusers(response?.userData)
        setpending(false)
      }
     }
    useEffect(()=>{
      getAllUsers()
    },[])
  return (
    <>
    { !pending ? 
    <div>
      <div className='flex'>
        <h1 className='font-bold text-3xl my-6'>Users :</h1>
      </div>
    {/* <table className=" rounded-md bg-white border border-gray-300">
    <thead>
        <tr>
          <th >👤</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Phone</th>
        </tr>
    </thead>
    <tbody>
      {users?.map((user:{fullName:string,mobileNumber:number,profileImg:string,email:string},index:any)=>(
        <tr className="bg-white border-b">
          <td className="px-6 py-4 whitespace-nowrap"><img  src={user?.profileImg} alt={user?.fullName}  className="w-16 h-16 rounded-full" /></td>
            <td className="px-6 py-4 whitespace-nowrap">{user?.fullName[0].toUpperCase()+user?.fullName.slice(1)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user?.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user?.mobileNumber}</td>
            
        </tr>   

))}
    </tbody>
</table> */}
 <div className="overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
    <table className="w-full text-sm text-gray-700 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            <tr>
                <th scope="col" className="px-8  py-3">
                   Profile
                </th>
                <th scope="col" className="px-8 py-3">
                   Name
                </th>
                <th scope="col" className="px-8 py-3">
                     Email
                </th>
                <th scope="col" className="px-8 py-3">
                     Number
                </th>
               
               
            </tr>
        </thead>
        <tbody className="bg-white  dark:bg-gray-900">
            {users?.map((user:{fullName:string,mobileNumber:number,profileImg:string,email:string},index:any) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-center whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
                    <img  src={user?.profileImg} alt={user?.fullName}  className="w-16 h-16 rounded-full" />
                    </td> 
                    <td className="px-6 py-4 text-center"> 
                    {user?.fullName[0].toUpperCase()+user?.fullName.slice(1)}
                    </td>
                    <td className="px-6 py-4 text-center"> 
                    {user?.email}
                    </td>
                    <td className="px-6 py-4 text-center"> 
                    {user?.mobileNumber}
                    </td>
                   
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div>
   :"Loading......" }
    </>
 
  )
}

export default Userpage