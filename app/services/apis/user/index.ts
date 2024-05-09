import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../axiosInstance"
import { apiRoutes,adminRoutes } from '../../ApiRoutes';
import { TokenType,UserType,RegisterType } from '@/app/types/userTypes';
import axios from 'axios';


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
export const registerUserAPI = async (params?: UserType|string) =>{
  try {
    const response = await axios.post(apiRoutes.registerUser, params)
    // if (!response) {
      
    //   const errData = await response;
    //   console.log("Register error",errData)
    //   return errData;
    // }

    return response.data;
  } catch (err:any) {
    console.error("Login Error:", err.response?.data?.message,err);
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
    // throw error;
  }
}


// export const getAdminApi = async(token:any|{}) => {
//   try {
//     // console.log("admin-sdsd",token)
//     const response = await fetch(`${apiUrl}${apiRoutes.adminUsers}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer ${token}` 
//       },
//     });

//      // Check if the response is successful
//      if (!response.ok) {
//       console.log("getAdminApi---",response)
//       return response;
//       // throw new Error('GEt ADmin Login failed');
//     }

//     // // Assuming the response is JSON
//     const responseData = await response.json();
//     return responseData;
    
//   } catch (error) {
//         console.log("error",error);
//         throw new Error('getAdminApi func failed');
//   }
// }