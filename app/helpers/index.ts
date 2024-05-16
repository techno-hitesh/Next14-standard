import Sign from "jwt-encode";
import { jwtDecode } from "jwt-decode";

const jwtSecret:any = process.env.NEXT_PUBLIC_JWT_SECRET

export const jwtEncodeData = (data:any) =>{
    try {
        const jwt = Sign(data,jwtSecret);
        return jwt;

    } catch (error) {
        console.log("error jwtEncode",error)
    }
}

export const jwtDecodeData = (data:any) =>{
    try {
        const decode = jwtDecode(data)
        return decode;

    } catch (error) {
        console.log("error jwtDecode",error)
    }
}