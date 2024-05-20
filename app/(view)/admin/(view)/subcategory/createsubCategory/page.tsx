"use client"
import React, { useEffect, useState } from 'react'
import { subcategoryschema } from '../../schema/page'
import { Getallcategories, createsubcategoryAPI } from '@/app/services/apis/admin/products'
import { ToastContainer, toast } from 'react-toastify'
import { useFormik } from 'formik'
import { category } from '@/app/types/userTypes'
import { useRouter } from 'next/navigation'


let val={
    categoryName:"",
    subCategoryName:"",
    subCategoryDescription:"",
    subCategoryImg:""
  }
  const CreateSubcategory = () => {
    const [categories,setcategories]= useState<category[]>([]);
  const router=useRouter()
        const {values,errors,touched,handleBlur,setFieldValue,handleChange,handleSubmit}=useFormik({
            initialValues:val,
            validationSchema:subcategoryschema,
            onSubmit:async(values,action)=>{
             const response=await createsubcategoryAPI(values)
             console.log(response)
             if(response?.status===201 || response.status===200){
                 action.resetForm()
              toast.success("Subcategory created")
              setTimeout(() => {
                router.replace("/admin/subcategory")
              }, 2000);
             }else{
               toast.error("Network error")
             }
            }
         })
        

     

     const category=async()=>{
       const response=await Getallcategories()
       if(response?.status===200){
        setcategories(response?.data)
       }else{
         toast.error("Network error")
       }
        
     }
     const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        console.log(file);
        if (file) {
          setFieldValue("subCategoryImg", file)
        }
      };
     useEffect(()=>{
       category()
     },[])
  return (
    <div className=''>  
        <div className='flex flex-col mt-5 border border-gray-200 rounded-md p-5 shadow-md shadow-gray-500'>
    <div className='flex flex-col'>
        <h1 className=' font-bold text-3xl shadow-sm shadow-blue-200 my-4 text-gray-800 rounded-md px-2 py-1'>Create Subcategory</h1>
    </div>
    <div className=''>
    <form onSubmit={handleSubmit} >
        <div className='flex flex-col  gap-y-5'>
      <div className='flex flex-col '>
        <label htmlFor="name" className='text-xl text-gray-800 font-bold'>Category Name <span className='text-red-400 '>*</span></label>
        <select name="categoryName" value={values.categoryName}  className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' onChange={handleChange} onBlur={handleBlur}>
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
        <label  className='text-xl text-gray-800 font-bold' htmlFor="name">Subcategory name <span className='text-red-400 '>*</span></label>
        <input type="text" placeholder='Enter subcategory name' name='subCategoryName' value={values.subCategoryName} onChange={handleChange} className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' onBlur={handleBlur}/>
        {errors.subCategoryName && touched.subCategoryName ? <p className='text-red-500'>{errors.subCategoryName}</p> : null}
      </div>
      <div className='flex flex-col '>
        <label className='text-xl text-gray-800 font-bold' htmlFor="description">Subcategory Description <span className='text-red-400 '>*</span></label>
        <input type="text" placeholder='Enter subcategory description' name='subCategoryDescription' value={values.subCategoryDescription} onChange={handleChange} className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' onBlur={handleBlur}/>
        {errors.subCategoryDescription && touched.subCategoryDescription ? <p className='text-red-500'>{errors.subCategoryDescription}</p> : null}
      </div>
      <div className='flex flex-col mt-2'>
        <label htmlFor="Image" className='text-xl text-gray-800 mt-2 font-bold'>Subcategory Image<span className='text-red-400 '>*</span></label>
        <input type="file"  className='px-3 py-2 m-1 rounded-md border border-gray-200 shadow-sm shadow-gray-300' name='subCategoryImg' required  onChange={handleImgChange} onBlur={handleBlur}/>
         {errors.subCategoryImg && touched.subCategoryImg ? <p className='text-red-500'>{errors.subCategoryImg}</p> : null}
    </div>
      <button type='submit' className='bg-blue-800 px-3 py-1 rounded-md text-white w-fit hover:bg-blue-700'>Add subcategory</button>
      </div>
    </form>
    </div>
</div>
<ToastContainer/>
    </div>
  )
}

export default CreateSubcategory