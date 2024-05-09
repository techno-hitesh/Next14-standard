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
    console.log("tokn header",storedToken,authConfig.storageTokenKeyName)
    if (storedToken) {
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
    if (error.response?.status === 401) {
      localStorage.clear()
      if (typeof window !== 'undefined') {
        window.location.replace('/')
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
