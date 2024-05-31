"use client"
import React, { useEffect, useState } from 'react'
import { subcategoryschema } from '../../schema/schema'
import { Getallcategories, createsubcategoryAPI } from '@/app/services/apis/admin/products'
import { ToastContainer, toast } from 'react-toastify'
import { useFormik } from 'formik'
import { category } from '@/app/types/userTypes'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import back from  "@/public/images/sub.jpeg"


let val={
    categoryName:"",
    subCategoryName:"",
    subCategoryDescription:"",
    subCategoryImg:""
  }
  const CreateSubcategory = () => {
    const [pending,setpending]=useState(false)
    const [categories,setcategories]= useState<category[]>([]);
  const router=useRouter()
        const {values,errors,touched,handleBlur,setFieldValue,handleChange,handleSubmit}=useFormik({
            initialValues:val,
            validationSchema:subcategoryschema,
            onSubmit:async(values,action)=>{
              setpending(true)
             const response=await createsubcategoryAPI(values)
             console.log(response)
             if(response?.status===201 || response.status===200){
              setpending(false)
                 action.resetForm()
                 const input = document.querySelector('input[type="file"]');
                 if (input) {
                     (input as HTMLInputElement).value = '';
                 }
              toast.success("Subcategory created")
              setTimeout(() => {
                router.replace("/admin/subcategory")
              }, 3000);
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
    <div className='mt-5'>  
    <div className='flex justify-between  border border-gray-200 rounded-md  shadow-md shadow-gray-500'>
        <div className='flex flex-col p-8'>
            <h1 className=' font-bold text-3xl   my-4 text-gray-800 rounded-md px-5 py-2'>Create Subcategory</h1>
          <div className='p-5'>
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
            <button type='submit' className='bg-blue-800 px-3 py-2 flex justify-center items-center rounded-md text-white w-[50%] hover:bg-blue-700'>
              {pending ? 
              <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
            :"Add subcategory"  
            }
            </button>
            </div>
          </form>
          </div>
        </div>
    <Image
         src={back}
         alt='Loading...'
         className=' overflow-hidden w-full rounded-md'
        />
    </div>
<ToastContainer/>
    </div>
  )
}

export default CreateSubcategory