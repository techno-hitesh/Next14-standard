"use client"
import React, { useEffect, useState } from 'react'
import { UserRoleAPI } from '@/app/services/apis/user'
import LoadingSpiner from "../components/loading"
import { UserDataType } from '@/app/types/userTypes'
import Link from 'next/link'
import UpdateProfile from '../../dashboard/components/updateProfile'

const UserProfile = () => {

  const [userVal, setUserVal] = useState<UserDataType|any>()
  const [loading,setLoading] = useState<boolean>(false)

  const data = async () => {
    const resp = await UserRoleAPI()
    if (resp.status == 200) {
      // console.log("res--", resp.userData)
      setUserVal(resp.userData)
      setLoading(true)
      
    }
  }


  const handleUpdateSuccess=async()=>{
    const response=await UserRoleAPI()
    if(response?.status===200){

        data()
    }
}

  useEffect(() => {
    data();
  }, [])

  return (
    <>
    {userVal !="" && loading ==true ?  

      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div className='flex items-center gap-5'>
          <img src={userVal?.profileImg} className='w-10 h-10 rounded-full' alt="" />
          <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
          </div>
          </div>
          <UpdateProfile onUpdateSuccess={handleUpdateSuccess}/>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userVal?.fullName[0].toUpperCase()+userVal?.fullName.slice(1)}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userVal?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userVal?.mobileNumber}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userVal?.address}
              </dd>
            </div>
          </dl>
          
        

        </div>
      </div>
      
      : <div className='w-[50px] h-[50px]'>
        <LoadingSpiner />
        </div>}
    </>
  )
}

export default UserProfile
