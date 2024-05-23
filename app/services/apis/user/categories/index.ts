import { categories } from "@/app/services/ApiRoutes";
import axiosInstance from "@/app/services/axiosInstance";
import { toast } from "react-toastify";




export const getAllCategoryAPI = async () =>{
    try {
      const response = await axiosInstance.get(`${categories.getAllCategory}`)
      return response.data;
    } catch (err:any) {
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message
    }
}


export const getSubCategoryByIdAPI = async (id:string) =>{
    try {
      const response = await axiosInstance.get(`${categories.getCategoryById}${id}`)
      return response.data;
    } catch (err:any) {
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message
    }
}


export const getSubCateProductByIdAPI = async (id:string) =>{
    try {
      const response = await axiosInstance.get(`${categories.getSubCategoryById}${id}`)
      return response.data;
    } catch (err:any) {
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message
    }
}