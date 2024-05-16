import axiosInstance from "../../axiosInstance"
import { address } from "../../ApiRoutes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addressType } from "@/app/types/userTypes";



export const addAddressApi = async (params?: addressType) =>{
    try {
      const response = await axiosInstance.post(address.createAddress, params)
      console.log("SDfdfdfd")
      return response.data;
    } catch (err:any) {
    //   console.error("add  addAddressApi:", err.response?.data?.message,err?.message);
      toast.error(err?.response?.data?.message || err?.message)
      return err?.response?.data?.message || err?.message;
    //   alert("Sdfdsf")
    // throw err;
    
    }
}