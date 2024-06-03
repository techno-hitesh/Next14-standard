"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import bg from "@/public/images/ppbg.jpg"
import back from "@/public/images/pro.webp"
import { UserRoleAPI, loginUserAPI } from '@/app/services/apis/user';
import { UserDataType } from '@/app/types/userTypes';
import UpdateProfile from '../../components/updateProfile';
const Page = () => {
    const [user,setuser]=useState<UserDataType|any>()
    const [pending,setpending]=useState(true)
     const fetchadmin=async()=>{
        const response=await UserRoleAPI()
        if(response?.status===200){
            setuser(response?.userData)
            setpending(false)
           

        }
     }
     const handleUpdateSuccess=async()=>{
        const response=await UserRoleAPI()
        if(response?.status===200){

            fetchadmin()
        }
    }
    useEffect(()=>{
      fetchadmin()
    },[])
  return (
    <>
  {user ?
    <section className="w-full overflow-hidden font-sans dark:bg-gray-900">
    <div className="flex flex-col">
        {/* <!-- Cover Image --> */}
        <Image
        src={bg} alt="User Cover"
        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
        />
        {/* <!-- Profile Image --> */}

        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                     { user?.profileImg==="null" || pending==true? 
                     <Image
                     src={back}
                     alt='Loading..'
                     className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-gray-300 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
                     /> : 
                     <img src={user?.profileImg}
                      className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-gray-300 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
                       alt="" />
                     }
                        {/* <!-- FullName --> */}
            <h1
                className="w-full font-sans text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl ">
                    {user.fullName}
              </h1>
             <UpdateProfile onUpdateSuccess={handleUpdateSuccess}/>
            
        </div>


        <div
            className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
            {/* <!-- Description --> */}
            <p className="w-fit text-gray-700 dark:text-gray-400 text-md">Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem
                veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore
                similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic
                eligendi vitae animi nam in, est earum culpa illum aliquam.</p>


            {/* <!-- Detail --> */}
            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                    <div className="w-full">
                        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-col pb-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400"> Name</dt>
                                <dd className="text-lg font-semibold">{user.fullName}</dd>
                            </div>
                           
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Of Birth</dt>
                                <dd className="text-lg font-semibold">21/02/1997</dd>
                            </div>
                            <div className="flex flex-col py-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</dt>
                                <dd className="text-lg font-semibold">Human</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="w-full">
                        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-col pb-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Address</dt>
                                <dd className="text-lg font-semibold">{user.address}</dd>
                            </div>

                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                                <dd className="text-lg font-semibold">{user.mobileNumber}</dd>
                            </div>
                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                <dd className="text-lg font-semibold">{user.email}</dd>
                            </div>
                            
                            <div className="flex flex-col pt-3">
                                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
                                <dd className="text-lg font-semibold">https://www.teclick.com</dd>
                            </div>
    
                        </dl>
                    </div>
                </div>
                
          
            </div>
       </div>
    </div>
</section>
:"Loading........."
}
    </>
  )
}

export default Page