import axiosInstance from "../../axiosInstance"
import { payments } from "../../ApiRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getAllPayments = async () =>{
    try {
      const response = await axiosInstance.get(`${payments.getAllPaymentDetails}`)
      return response.data;
    } catch (err:any) {
      // console.error("Login Error:", err.response?.data?.message,err);
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message
      // throw error;
    }
}


export const getPaymentsById = async (id:string) =>{
    try {
      const response = await axiosInstance.get(`${payments.getPaymentsById}${id}`)
      return response.data;
    } catch (err:any) {
      // console.error("Login Error:", err.response?.data?.message,err);
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message
      // throw error;
    }
}

export const getPdfById = async (id:string) =>{
    try {
      const response = await axiosInstance.get(`${payments.getpdf}${id}`)
      return response.data;
    } catch (err:any) {
      // console.error("Login Error:", err.response?.data?.message,err);
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message
      // throw error;
    }
}
  
  