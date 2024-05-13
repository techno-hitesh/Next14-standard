"use client"
import React, { useEffect, useState } from 'react'
import { UserRoleAPI } from '@/app/services/apis/user'

const userProfile = () => {

    const [userVal,setUserVal] = useState()

        const data = async()=>{
            
           const resp = await  UserRoleAPI()
           if(resp.status == 200){
                console.log("res--",resp.userData)
                setUserVal(resp.userData)
           }
       

        }
        useEffect(()=>{
            data();
        },[])

 return (
    <>

    {/* {userVal!="" ? userVal?.fullName :""} */}
    "testing User"
      
    </>
  )
}

export default userProfile
