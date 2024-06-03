import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../axiosInstance"
import { apiRoutes,adminRoutes ,cartRoutes,payments} from '../../ApiRoutes';
import { TokenType,UserType,RegisterType,addToCartType,updateCartItemType,UserForgotType } from '@/app/types/userTypes';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import auth from '@/app/configs/auth';

const base=process.env.NEXT_PUBLIC_API_BASE_URL
const config = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
};
export const reviewADdAPi=async(reviewData:any)=>{
  try{
    const token=localStorage.getItem(auth.storageTokenKeyName)
    const response=await axios.post(base+apiRoutes.addReview,
     reviewData,{
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json'
      }
     }
    )
  return response?.data
  }catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
  }
}
export const LogoutUserAPI=async()=>{
  try{
    const response=await axiosInstance.post(apiRoutes.logoutUser)
    return response.data
  }catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
  }
}

export const loginUserAPI = async (params?: UserType|string) =>{
  try {
    const response = await axiosInstance.post(apiRoutes.userLogin, params)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const forgotPasswordAPI = async (params: UserForgotType) =>{
  try {
    const response = await axiosInstance.post(apiRoutes.forgotUser, params)
    return response.data;
  } catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const forgotResetAPI = async (params: UserForgotType) =>{
  try {
    const response = await axiosInstance.post(apiRoutes.resetPass, params)
    return response.data;
  } catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
    throw err;
  }
}


export const registerUserAPI = async (params?: UserType|string) =>{
  try {
    const response = await axios.post(apiRoutes.registerUser, params,config)
    return response.data;
  } catch (err:any) {
    console.error("Register Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const UserRoleAPI = async () =>{
  try {
    const response = await axiosInstance.get(apiRoutes.getUsers)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}


export const addToCartAPI = async (params?: addToCartType) =>{
  try {
    const response = await axiosInstance.post(cartRoutes.addToCart, params)
    return response.data;
  } catch (err:any) {
    console.error("add to cartError:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}


export const getToCartAPI = async () =>{
  try {
    const response = await axiosInstance.get(cartRoutes.getAllCart)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const getItemInCartAPI = async (id:string|any) =>{
  try {
    const response = await axiosInstance.get(`${cartRoutes.getItemCart}${id}`)
    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}


export const updateCartItemAPI = async (params?: string,body?:updateCartItemType) =>{
  try {
    const response = await axiosInstance.patch(`${cartRoutes.updateItemCart}${params}`,body )
    return response.data;
  } catch (err:any) {
    console.error("add to cartError:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}


export const delCartItemAPI = async (params: string) =>{
  try {
    const response = await axiosInstance.delete(`${cartRoutes.removeCartItem}${params}`)
    return response.data;
  } catch (err:any) {
    console.error("delCartItemAPI cartError:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const delCartQuantityAPI = async (params: string) =>{
  try {
    const response = await axiosInstance.delete(`${cartRoutes.removeCartQuantity}${params}`)
    return response.data;
  } catch (err:any) {
    console.error("delCartQuantityAPI cartError:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const stripeSessionAPI = async (params: any) =>{
  try {
    const response = await axiosInstance.post(`${payments.createPayment}`,params)
    console.log("enter in stripe----",params)
    return response.data;
  } catch (err:any) {
    console.error("stripeSessionAPI cartError:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}

export const middlewareRoleAPI = async (token:string | undefined) =>{
  try {
    const response = await axios.get(apiRoutes.getUsers,{
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
      },
    })

    return response.data;
  } catch (err:any) {
    // console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
    // throw error;
  }
}

export const AddtoWishlistAPI=async(id:any)=>{
  try{
    const response=await axiosInstance.post(apiRoutes.wishlistUser,id)
    return response?.data
  }catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
  }
}
export const getuserWishlistAPI=async()=>{
  try{
    const response=await axiosInstance.get(apiRoutes.getuserWishlist)
    return response?.data
  }catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
  }
}

export const  getAllReviwAPI=async(id:any)=>{
  try{
    const response=await axiosInstance.get(apiRoutes.getAllReview+id)
    return response?.data
  }catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
  }
}
export const DeleteWishListAPI=async(id:any)=>{
  try{
    const response=await axiosInstance.delete(apiRoutes.deleteWishlist+id)
    return response?.data
  }catch (err:any) {
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
  }
}