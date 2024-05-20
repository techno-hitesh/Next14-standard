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
    categoryDescription:'',
    categoryImg:""

}
const CategoryPage = () => {
  const [categories,setcategories]=useState<any>([])
    const getallcategories=async()=>{
        const response=await Getallcategories()
        if(response?.status===200){
            console.log(response?.data)
            setcategories(response?.data)
        }
    }

    const {values,touched,errors,handleBlur ,setFieldValue,handleChange,handleSubmit}=useFormik({
        initialValues:val,
        validationSchema:categoryschema,
        onSubmit:async(values:any,action:any)=>{
           console.log(values)
           const response=await createcategoryAPI(values)
           if(response?.status===200 || response?.status===201){
             action.resetForm()
             getallcategories()
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
    useEffect(()=>{
        getallcategories()
    },[])
   
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
      <div className='my-5'>
        <h1 className='text-3xl font-bold'>All categories</h1>
      </div>
      <div className='grid grid-cols-4  gap-5'>
      {categories?.map((category: { categoryName: string ,_id:string,categoryDescription:string,categoryImg:string},index:any)=>(
        <div key={index} className="max-w-sm relative  shadow-gray-500 bg-white border w-full  border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
         <a href="#">
        <img className="rounded-t-lg w-full h-[60%]"   src={category?.categoryImg} alt={category?.categoryName} />
    </a>
    <div className="p-5 ">
        <a href="#">
            <h5 className="mb-2 my-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">{category?.categoryName}</h5>
        </a>
      
        <Link href={`/admin/category/${category?._id}`} className="inline-flex items-center px-3 absolute bottom-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
        </div>    
 ))}
      </div>
    </div>
      <div className='mt-10  border border-gray-200 p-4'>
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

       <ToastContainer/>
    </>
  )
}

export default CategoryPage


