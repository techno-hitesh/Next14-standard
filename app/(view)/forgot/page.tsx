"use client"
import Link from "next/link"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const forgotPass = () => {
  return (
    <div>
        <ToastContainer autoClose={2000} />
        {/* onSubmit={handleSubmit}  */}
      <form
        className='flex flex-col justify-center items-center gap-5 max-w-lg shadow-2xl shadow-gray-900 h-screen hover:shadow-gray-300  bg-white mx-auto rounded-md text-gray-900 mt-4'  >
        <h3 className='text-2xl '>Please Log In! </h3>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input required type="email" name="email" className="mt-1 px-3 py-4 w-[350px] md:w-[450px] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            // value={formValue.email}
            // onChange={(e) => handleChange(e)   }

            placeholder="Enter your email address" />
          {/* <p className="text-red-500">{formErrors.email}</p> */}
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input required type="password" name="password" className="mt-1 w-[350px] md:w-[450px] px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Enter your password"
            // value={formValue.password}
            // onChange={(e) => handleChange(e)       }
          />
          {/* <p className="text-red-500">{formErrors.password}</p> */}
        </label>

       
        <span className='block w-full mr-auto ml-7'>Dont have any Account? <Link className='text-blue-700 font-bold' href="/register">Sign Up</Link></span>
        <button className='bg-[#53c28b] text-white rounded-md p-[15px] w-[90%]' type="submit"></button>
      </form>
    </div>
  )
}

export default forgotPass
