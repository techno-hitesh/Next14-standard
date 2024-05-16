"use client"
import { Getallcategories, createsubcategoryAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { subcategoryschema } from '../../schema/page'
import { category } from '@/app/types/userTypes'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';



let val={
    categoryName:"",
    subCategoryName:"",
    subCategoryDescription:""
  }
const Subcategory = () => {
    const [categories,setcategories]= useState<category[]>([]);
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:val,
        validationSchema:subcategoryschema,
        onSubmit:async(values,action)=>{
         console.log(values)
         const response=await createsubcategoryAPI(values)
         console.log(response)
         if(response?.status===201 || response.status===200){
           action.resetForm()
          toast.success("Subcategory created")
         }else{
           toast.error("Network error")
         }
        }
     })
 
     
      
     const category=async()=>{
       const response=await Getallcategories()
       console.log(response)
       if(response?.status===200){
         setcategories(response?.data)
       }else{
         toast.error("Network error")
       }
        
     }
     useEffect(()=>{
       category()
     },[])
  return (
    <>
    <div className='flex flex-col justify-center items-center '>
        <div className='flex flex-col'>
            <h1 className=' font-bold text-2xl shadow-sm shadow-blue-200 my-4 text-blue-800 rounded-md px-2 py-1'>Create Subcategory</h1>
    
        </div>
        <div className='flex justify-center  items-center my-[2%]'>
        <form onSubmit={handleSubmit} >
            <div className='flex flex-col  gap-y-5'>

           
          <div className='flex flex-col '>
            <label htmlFor="name" className='text-xl text-blue-800 font-bold'>Category Name <span className='text-blue-400 '>*</span></label>
            <select name="categoryName" value={values.categoryName}  className='px-3 py-2 m-1 rounded-md border border-blue-200 shadow-sm shadow-blue-300' onChange={handleChange} onBlur={handleBlur}>
              <option value="">Please Select a category</option>
              {categories.map((option, index) => (
                <option key={index} value={option.categoryName} data-id={option._id}>
                  {option.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryName && touched.categoryName ? <p className='text-red-500'>{errors.categoryName}</p> : null}
          </div>
          <div  className='flex flex-col '>
            <label  className='text-xl text-blue-800 font-bold' htmlFor="name">Subcategory name <span className='text-blue-400 '>*</span></label>
            <input type="text" placeholder='Enter subcategory name' name='subCategoryName' value={values.subCategoryName} onChange={handleChange} className='px-3 py-2 m-1 rounded-md border border-blue-200 shadow-sm shadow-blue-300' onBlur={handleBlur}/>
            {errors.subCategoryName && touched.subCategoryName ? <p className='text-red-500'>{errors.subCategoryName}</p> : null}
          </div>
          <div className='flex flex-col '>
            <label className='text-xl text-blue-800 font-bold' htmlFor="description">Subcategory Description <span className='text-blue-400 '>*</span></label>
            <input type="text" placeholder='Enter subcategory description' name='subCategoryDescription' value={values.subCategoryDescription} onChange={handleChange} className='px-3 py-2 m-1 rounded-md border border-blue-200 shadow-sm shadow-blue-300' onBlur={handleBlur}/>
            {errors.subCategoryDescription && touched.subCategoryDescription ? <p className='text-red-500'>{errors.subCategoryDescription}</p> : null}
          </div>
          <button type='submit' className='bg-blue-500 px-3 py-1 rounded-md text-white hover:bg-blue-700'>Add subcategory</button>
          </div>
        </form>
        
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Subcategory

