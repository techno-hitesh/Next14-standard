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

export const deleteadminsubCategoryApi=async(id:any)=>{
  try{
      const response=await axiosInstance.delete(adminRoutes.deletesubcategoryById+id)
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

export const getcategorybyidAPI=async(id:any)=>{
  try{
      const response=await axiosInstance.get(adminRoutes.getcategory+id)
      return response?.data
  }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}
export const getsubcategorybyidAPI=async(id:string |any)=>{
  try{
      const response=await axiosInstance.get(adminRoutes.getsubcategorybyId+id)
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

export const Getallsubcategory=async()=>{
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
        toast.error(err?.response?.data?.message || err?.message)
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
        toast.error(err?.response?.data?.message || err?.message)
    }
}
export const adminUpdateSubCategoryApi=async(id:string|any,formdata:any)=>{
  const token=localStorage.getItem(auth.storageTokenKeyName)
      try{
        const response=await axios.patch(baseurl+adminRoutes.adminUpdateSubCategoryAPi+id,formdata,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        })
        return response?.data
      }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}
export const createCategoryAPI=async(val:any)=>{
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

export const createsubcategoryAPI=async(val:any)=>{
  try{
    const token=localStorage.getItem(auth.storageTokenKeyName)
      const response=await axios.post(baseurl+adminRoutes.createsubcategory,val,{
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
export const adminCreateProductApi=async(formdata:any)=>{
  const token=localStorage.getItem(auth.storageTokenKeyName)
  try{
    const response=await axios.post(baseurl+adminRoutes.createproduct,formdata,{
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    return response?.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
}
}

export const GetUsersAdminAPI=async()=>{
     try{
      const response=await axiosInstance.get(adminRoutes.getallUsers)
      return response?.data
     }catch(err:any){
      toast.error(err?.response?.data?.message || err?.message)
  }
}

export const UpdateProfileAdminApi=async(data:any)=>{
  const token=localStorage.getItem(auth.storageTokenKeyName)
  try{
    const response=await axios.patch(baseurl+adminRoutes.updateProfileAdmin,data,{
      headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
  })
  return response?.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
}
}

export const ChangePasswordAdminAp=async(resetdata:any)=>{
  try{
    const response=await axiosInstance.patch(adminRoutes.resetpasswordAdmin,resetdata)
    return response?.data
   }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
}
}