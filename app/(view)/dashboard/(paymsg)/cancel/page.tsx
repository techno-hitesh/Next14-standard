"use client"
import Link from "next/link";
import { useRouter } from "next/navigation"

const CancelForm = () => {

  const router = useRouter();

  setTimeout(()=>{
    router.replace("/dashboard")
  },2000)
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">

      <svg className="text-red-600 w-16 h-16 mx-auto my-6 "  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Cancel!</h3>
          <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Have a great day!  </p>
          <div className="py-10 text-center">
            <Link href="/dashboard" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelForm;