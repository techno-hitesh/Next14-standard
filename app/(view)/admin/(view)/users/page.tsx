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
    { !pending ? <div>
      <div className='flex'>
        <h1 className='font-bold text-3xl my-6'>Users :</h1>
      </div>
    <table className=" rounded-md bg-white border border-gray-300">
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
</table>
</div>
   :"Loading......" }
    </>
 
  )
}

export default Userpage