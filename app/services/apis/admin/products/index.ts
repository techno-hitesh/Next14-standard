import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance"
import { adminRoutes } from '../../../ApiRoutes';
import axios from 'axios';
import auth from '@/app/configs/auth';
import { createcategory, createsubcategoty } from '@/app/types/userTypes';


const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL

export const GetAllProductAPI = async () =>{
    try {
      const response = await axiosInstance.get(adminRoutes.getAllProducts)
      // console.error("response Error:", response);
      return response.data;
    } catch (err:any) {
      // console.error("GetAllProductAPI Error:", err.response?.data?.message,err);
      toast.error(err?.response?.data?.message || err?.message)
     
    }
}
export const getproductBySearch=async(data:any)=>{
  try{
    const response=await axiosInstance.get(adminRoutes.getproductBySearch+data)
    return response?.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
  }
}

export const GetProductByIdAPI = async (id:string|any) =>{
  try {
    const response = await axiosInstance.get(`${adminRoutes.getProductById}${id}`)
    // console.error("response Error:", response);
    return response.data;
  } catch (err:any) {
    // console.error("GetAllProductAPI Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
   
  }
}


export const deleteadminproductApi=async(id:any)=>{
  try{
      const response=await axiosInstance.delete(adminRoutes.deleteProductById+id)
      return response?.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}

export const deleteadminCategoryApi=async(id:any)=>{
  try{
      const response=await axiosInstance.delete(adminRoutes.deleteCategoryById+id)
      return response?.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}

export const Getallcategories=async()=>{
  try{
      const response=await axiosInstance.get(adminRoutes.getallcategories)
      return response.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}

export const getcategorybyidAPI=async(id:string)=>{
  try{
      const response=await axiosInstance.get(adminRoutes.getcategory+id)
      return response.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}

export const Getallsubcategories=async(id:string)=>{
  try{
      const response=await axiosInstance.get(adminRoutes.getallsubcategories)
      return response.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}


export const adminUpdateProductApi=async(id:string|any,formdata:any)=>{
  const token=localStorage.getItem(auth.storageTokenKeyName)
      try{
        const response=await axios.patch(baseurl+adminRoutes.adminUpdateProduct+id,formdata,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        })
        return response?.data
      }catch(err:any){
        console.log(err)
      }
}
export const adminUpdateCategoryApi=async(id:string|any,formdata:any)=>{
  const token=localStorage.getItem(auth.storageTokenKeyName)
      try{
        const response=await axios.patch(baseurl+adminRoutes.adminUpdateCategoryAPi+id,formdata,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        })
        return response?.data
      }catch(err:any){
        console.log(err)
      }
}
export const createcategoryAPI=async(val:any)=>{
  try{
    const token=localStorage.getItem(auth.storageTokenKeyName)
      const response=await axios.post(baseurl+adminRoutes.createcategory,val,{
        headers:{
          "Authorization":`Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response?.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}

export const createsubcategoryAPI=async(val:createsubcategoty)=>{
  try{
      const response=await axiosInstance.post(adminRoutes.createsubcategory,val)
      return response?.data
     
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}
export const adminCreateProductApi=async(formdata:any)=>{
  const token=localStorage.getItem(auth.storageTokenKeyName)
  try{
    const response=await axios.post(baseurl+adminRoutes.createproduct,formdata,{
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log("createapi=-----------",formdata)
    return response?.data
  }catch(err:any){
    console.log("createapi-----------",formdata,err)
    toast.error(err?.response?.data?.message || err?.message)
}
}
