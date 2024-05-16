"use client"
import { Getallcategories, createcategoryAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { categoryschema } from '../schema/page'
import { useFormik } from 'formik'
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

let val={
    categoryName:"",
    categoryDescription:''

}
const CategoryPage = () => {
    const [categories,setcategories]=useState([])
    const getallcategories=async()=>{
        const response=await Getallcategories()
        if(response?.status===200){
            console.log(response?.data)
            setcategories(response?.data)
        }
    }

    const {values,touched,errors,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:val,
        validationSchema:categoryschema,
        onSubmit:async(values:any,action:any)=>{
           console.log(values)
           const response=await createcategoryAPI(values)
           console.log(response)
           if(response?.status===200 || response?.status===201){
             action.resetForm()
             getallcategories()
             toast.success("Category created sucessfully")
           }else{
             toast.error("Network error")
           }
        }
     })
    useEffect(()=>{
        getallcategories()
    },[])
  return (
    <>
    <div className='flex justify-around items-center'>
       <h1 className=' font-bold text-2xl shadow-sm shadow-blue-200 my-4 text-blue-800 rounded-md px-2 py-1'>All categories</h1>
       <Link href={'/admin/category/subcategory'}>
       <button className='bg-blue-200 font-bold text-xl text-blue-500 rounded-md px-2 py-1'>Add Subcategory +</button>
       </Link>
 </div>
    <div className='flex  mt-5 justify-center items-center'>
       {categories?.map((category,index:any)=>(
       <div key={index} className='flex justify-center items-center'>
    <span className="bg-blue-100  text-blue-800 text-xs font-medium me-2 px-3 py- rounded dark:bg-blue-900 dark:text-blue-300">{category.categoryName}</span>
    </div>
            
       ))}
       </div>
        <div className='flex mt-8 justify-center'>
       <h1 className=' font-bold text-2xl shadow-sm shadow-blue-200 my-4 text-blue-700 rounded-md px-2 py-1'>Create Category</h1>
        </div>
       <div className='flex justify-center  items-center my-[2%]'>
       <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col '>
            <label htmlFor="name" className='text-xl text-blue-800 font-bold'>Catgory name <span className='text-blue-400 '>*</span></label>
            <input type="text" placeholder='Enter name' name='categoryName' className='px-3 py-2 m-1 rounded-md border border-blue-200 shadow-sm shadow-blue-300' required value={values.categoryName} onChange={handleChange} onBlur={handleBlur}/>
             {errors.categoryName && touched.categoryName ? <p className='text-red-500'>{errors.categoryName}</p> : null}
        </div>
        <div className='flex flex-col mt-4'>
            <label htmlFor="description" className='text-xl text-blue-800 font-bold'>Catgory Description<span className='text-blue-400 '>*</span></label>
            <input type="text" placeholder='Enter description seprated by commas' className='px-3 py-2 m-1 rounded-md border border-blue-200 shadow-sm shadow-blue-300' name='categoryDescription' required value={values.categoryDescription} onChange={handleChange} onBlur={handleBlur}/>
             <p className='font-thin text-sm'>Enter description seprated by commas</p>
             {errors.categoryDescription && touched.categoryDescription ? <p className='text-red-500'>{errors.categoryDescription}</p> : null}
        </div>
        <button type='submit' className='bg-blue-700 text-white rounded-md px-2 py-1 cursor-pointer hover:bg-blue-800 mt-3'>Add category</button>
        </div>
    </form>
       </div>
       <ToastContainer/>
    </>
  )
}

export default CategoryPage


