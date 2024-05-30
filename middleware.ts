import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import auth from "@/app/configs/auth"
import { jwtDecodeData } from './app/helpers';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
 

  const path = request.nextUrl.pathname;
  const token = request.cookies.get(auth.storageTokenKeyName)?.value; 
  const isPublicPath = path === "/login" || path === "/register" || path === "/" || path==='/urbancart' ;
  const authRole	= request.cookies.get(auth.storageRole)?.value;
  let getRole:any
  if(authRole){
    getRole = jwtDecodeData(authRole);
    
  }

  console.log("middleware working",getRole, "token")



  if(!isPublicPath && token === undefined ){
    return NextResponse.redirect(new URL('/urbancart', request.url))
  }

  if(path === "/" && !token ){
    // console.log("middleware working----\public page",request.url)
    return NextResponse.redirect(new URL('/urbancart', request.url))
  }


  if(isPublicPath && token){
    if(isPublicPath  && token && getRole === "admin" ){
      console.log("middleware working----\admin ",request.url)
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  
    if(isPublicPath && token && getRole === "user"){
      // console.log("middleware working----\public page",request.url)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }  

  }else if(!isPublicPath && token){
    if(path.startsWith("/admin") && token && getRole==="user"){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }else if(path.startsWith("/dashboard") && token && getRole==="admin"){
      return NextResponse.redirect(new URL('/admin', request.url))
    }

  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
        '/' ,
        '/urbancart',
        '/login',
        '/landing',
        '/register',
        '/admin/:path*',
        '/dashboard/:path*',
    ],
}
