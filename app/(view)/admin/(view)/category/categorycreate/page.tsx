"use client"
import React from 'react'
import { createCategoryAPI } from '@/app/services/apis/admin/products'
import { ToastContainer, toast } from 'react-toastify'
import { categoryschema } from '../../schema/page'
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

    const {values,touched,errors,handleBlur ,setFieldValue,handleChange,handleSubmit}=useFormik({
        initialValues:val,
        validationSchema:categoryschema,
        onSubmit:async(values:any,action:any)=>{
           console.log(values)
        
           const response=await createCategoryAPI(values)
           if(response?.status===200 || response?.status===201){
             action.resetForm()
             const input = document.querySelector('input[type="file"]');
             if (input) {
                 (input as HTMLInputElement).value = '';
             }
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
        <button type='submit' className='bg-blue-800 w-fit text-white rounded-md px-3 py-2 cursor-pointer hover:bg-blue-800 mt-3'>Add category</button>
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
