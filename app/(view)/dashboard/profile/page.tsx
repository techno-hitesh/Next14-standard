"use client"
import React, { useEffect, useState } from 'react'
import { UserRoleAPI } from '@/app/services/apis/user'
import LoadingSpiner from "../components/loading"
import { UserDataType } from '@/app/types/userTypes'
import Link from 'next/link'
import auth from '@/app/configs/auth'
import Resetpass from '../changePassword/page'

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

  useEffect(() => {
    data();
  }, [])

  return (
    <>
    {userVal !="" && loading ==true ?  

      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
          </div>
          <Link href={'/dashboard/profile/update'}>
          <button  className='bg-blue-800 rounded-md text-white px-3 py-2'>Update Profile</button>
          </Link>
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
                (123) 456-7890
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                123 Main St<br />
                  Anytown, USA 12345
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
