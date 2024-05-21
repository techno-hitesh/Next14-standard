import axiosInstance from "../../axiosInstance"
import { address } from "../../ApiRoutes";
import { toast } from 'react-toastify';
import { addressType } from "@/app/types/userTypes";



export const addAddressApi = async (params?: addressType) =>{
    try {
      const response = await axiosInstance.post(address.createAddress, params)
      return response.data;
    } catch (err:any) {
    //   console.error("add  addAddressApi:", err.response?.data?.message,err?.message);
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message;
    //   alert("Sdfdsf")
    // throw err;
    
    }
}

export const getAddressAPI = async () =>{
  try {
    const response = await axiosInstance.get(address.getAllAddress)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}

export const getAddressByIdAPI = async (id:string) =>{
  try {
    const response = await axiosInstance.get(`${address.getAddressById}${id}`)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}

// /user/delete-address/

export const delAddressByIdAPI = async (id:string) =>{
  try {
    const response = await axiosInstance.delete(`${address.delAddressById}${id}`)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}

export const updateAddressAPI = async (id:string,params:any) =>{
  try {
    const response = await axiosInstance.patch(`${address.updateAddress}${id}`,params)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}