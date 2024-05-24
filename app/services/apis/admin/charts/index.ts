import {toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance"
import {charts} from '../../../ApiRoutes';

const baseurl=process.env.NEXT_PUBLIC_API_BASE_URL

export const RevenueChartAPI=async()=>{
    try{
        const response=await axiosInstance.get(charts.revenueApi)
        return response?.data
    }catch (err:any) {
        toast.error(err?.response?.data?.message || err?.message)  
      }
}


export const AllPaymentsAdminApi=async()=>{
    try{
        const response=await axiosInstance.get(charts.AllPayment)
        return response?.data
    }catch (err:any) {
        toast.error(err?.response?.data?.message || err?.message)  
      }
}