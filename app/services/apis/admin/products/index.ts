import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance"
import { adminRoutes } from '../../../ApiRoutes';



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