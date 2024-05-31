"use client"
import React, { useState } from 'react'
import { createCategoryAPI } from '@/app/services/apis/admin/products'
import { ToastContainer, toast } from 'react-toastify'
import { categoryschema } from '../../schema/schema'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import back from  "@/public/images/shop.jpg"


let val={
    categoryName:"",
    categoryDescription:'',
    categoryImg:""

}
const Categorycreate = () => {
     const [pending,setpending]=useState(false)
    const {values,touched,errors,handleBlur ,setFieldValue,handleChange,handleSubmit}=useFormik({
        initialValues:val,
        validationSchema:categoryschema,
        onSubmit:async(values:any,action:any)=>{
           console.log(values)
            setpending(true)
           const response=await createCategoryAPI(values)
           if(response?.status===200 || response?.status===201){
             action.resetForm()
             const input = document.querySelector('input[type="file"]');
             if (input) {
                 (input as HTMLInputElement).value = '';
             }
             setpending(false)
             toast.success("Category created sucessfully")
           }
        }
     })


     const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; 
      console.log(file);
      if (file) {
        setFieldValue("categoryImg", file)
      }
    };
    
  return (
    <>
    <div className='mt-10'>
      <div className='flex'>
        <div className='border border-gray-200 shadow-sm rounded-md p-6 w-[60%] shadow-gray-300'>
       <h1 className='font-bold text-3xl'>Create Category :</h1>
       <div>
       <form onSubmit={handleSubmit}>
        <div className='flex  flex-col'>
        <div className='flex flex-col '>
            <label htmlFor="name" className='text-xl text-gray-600 font-semibold mt-6'>Catgory name <span className='text-red-400 '>*</span></label>
            <input type="text" placeholder='Enter name' name='categoryName' className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' required value={values.categoryName} onChange={handleChange} onBlur={handleBlur}/>
             {errors.categoryName && touched.categoryName ? <p className='text-red-500'>{errors.categoryName}</p> : null}
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="description" className='text-xl text-gray-600 mt-2 font-semibold'>Catgory Description<span className='text-red-400 '>*</span></label>
            <input type="text" placeholder='Enter description seprated by commas' className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' name='categoryDescription' required value={values.categoryDescription} onChange={handleChange} onBlur={handleBlur}/>
             <p className='font-thin text-sm'>Enter description seprated by commas</p>
             {errors.categoryDescription && touched.categoryDescription ? <p className='text-red-500'>{errors.categoryDescription}</p> : null}
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="Image" className='text-xl text-gray-600 mt-2 font-semibold'>Catgory Image<span className='text-red-400 '>*</span></label>
            <input type="file"  className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' name='categoryImg' required  onChange={handleImgChange} onBlur={handleBlur}/>
             {errors.categoryImg && touched.categoryImg ? <p className='text-red-500'>{errors.categoryImg}</p> : null}
        </div>
        <button type='submit' className='bg-blue-800 w-[30%] flex items-center justify-center text-white rounded-md px-3 py-2 cursor-pointer hover:bg-blue-800 mt-3'>{pending ? 
              <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
     :
      "Add Category"
          }</button>
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
 

  
        </div>

       <ToastContainer/>
    </>
  )
}

export default Categorycreate
