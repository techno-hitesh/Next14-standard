import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import auth from "@/app/configs/auth"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
 

  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/register" || path === "/"  ;

  const token = request.cookies.get(auth.storageTokenKeyName)?.value; 
  const authRole	= request.cookies.get(auth.storageRole)?.value;

  console.log("middleware working",authRole)

  if(!isPublicPath && token === undefined ){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(path === "/" && !token){
    // console.log("middleware working----\public page",request.url)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(isPublicPath && token && authRole === "admin"){
    // console.log("middleware working----\public page",request.url)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if(isPublicPath && token && authRole === "user"){
    console.log("middleware working----\public page",request.url)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }  
  
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
        '/' ,
        '/login',
        '/register',
        '/dashboard/:path*',
        '/dashboard/cart'
    ],
}



  // return NextResponse.json(
  //   { success: false, message: 'authentication failed' },
  //   { status: 401 })