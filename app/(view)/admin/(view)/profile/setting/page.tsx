"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import back from "@/public/images/ppbg.jpg"
import { useFormik } from 'formik';
import { resetpasswordSchema } from '../../schema/schema';
import { UserRoleAPI } from '@/app/services/apis/user';
import { ChangePasswordAdminAp } from '@/app/services/apis/admin/products';
import { ToastContainer, toast } from 'react-toastify';



const Resetpassword =() => {
    const getuser=async()=>{
        const response=await UserRoleAPI()
        console.log(response?.userData)
    }
    let val={
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
    }

    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
       initialValues:val,
       validationSchema:resetpasswordSchema,
       onSubmit:async(values,action)=>{
        const response=await ChangePasswordAdminAp(values)
        if(response?.status===200){
            action.resetForm()
            toast.success("Updated Succesfully")
        }else{
            toast.error(response?.message)
        }
       }
    })
    useEffect(()=>{
      getuser()
    },[])
  return (
    <div className='mt-10'>
     <div>
        <h1 className='font-bold text-2xl'>Reset Password :</h1>
        <p className="text-gray-700 mb-4">
        We are here to help you reset your password and get you back on track. Please follow the instructions
          below to reset your password securely.
        </p>
        <div className="text-gray-700 mb-4">
            <p className='text-gray-900 font-semibold'> Instructions :</p>
            <ul>
                <li>* Password must be at least 8 characters long.</li>
                <li>* Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-).</li>
            </ul>
        </div>
        
     </div>
    <div className='flex'>
      <div className='border border-gray-200 shadow-sm rounded-md p-6 w-[60%] shadow-gray-300'>
     <div className='p-4'>
     <form onSubmit={handleSubmit}>
      <div className='flex  flex-col'>
      <div className='flex flex-col mt-4'>
          <label htmlFor="password" className='text-xl text-gray-600 mt-2 font-semibold'>Old Password<span className='text-red-400 '>*</span></label>
          <input type="text"  className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' name='oldPassword' required value={values.oldPassword}  onChange={handleChange} onBlur={handleBlur}/>
           {errors.oldPassword && touched.oldPassword ? <p className='text-red-500'>{errors.oldPassword}</p> : null}
      </div>
      <div className='flex flex-col mt-4'>
          <label htmlFor="newpassword" className='text-xl text-gray-600 mt-2 font-semibold'>New Password<span className='text-red-400 '>*</span></label>
          <input type="text"  className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' name='newPassword' required value={values.newPassword}  onChange={handleChange} onBlur={handleBlur}/>
           {errors.newPassword && touched.newPassword ? <p className='text-red-500'>{errors.newPassword}</p> : null}
      </div>
      <div className='flex flex-col mt-4'>
          <label htmlFor="password" className='text-xl text-gray-600 mt-2 font-semibold'>Confirm Password<span className='text-red-400 '>*</span></label>
          <input type="text"  className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' name='confirmPassword' required value={values.confirmPassword}  onChange={handleChange} onBlur={handleBlur}/>
           {errors.confirmPassword && touched.confirmPassword ? <p className='text-red-500'>{errors.confirmPassword}</p> : null}
      </div>
      <button type='submit' className='bg-blue-800 w-fit text-white rounded-md px-3 py-2 cursor-pointer hover:bg-blue-800 mt-3'>Reset Password</button>
      </div>
  </form>
     </div>
      </div>
      <Image
       src={back}
       alt='Loading...'
       className='bg-cover w-[49%] rounded-md'
      />
    </div>

<ToastContainer/>

      </div>
  )
}

export default Resetpassword