import axios from 'axios'
import authConfig from "@/app/configs/auth"

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getToken = () => {
  return window.localStorage.getItem(authConfig.storageTokenKeyName);
};

axiosInstance.interceptors.request.use(
  request => {
    const storedToken = getToken();
    // console.log("tokn headersss",storedToken)
    if (storedToken !== null) {
      request.headers.Authorization = `Bearer ${storedToken}`
    }

    return request
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response?.status === 401 || 404) {
      console.log("storedToken undefined",error)
      // deleteCookie(authConfig.storageTokenKeyName)
      // deleteCookie(authConfig.storageRole)

      // localStorage.clear()
      if (typeof window !== 'undefined') {
        console.log("storedToken undefined replace",)
        // window.location.replace('/')
      }
    }

    return Promise.reject(error)
  }
)

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}


export default axiosInstance
