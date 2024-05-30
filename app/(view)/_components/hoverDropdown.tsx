
import auth from '@/app/configs/auth';
import { useCookies } from 'next-client-cookies';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";

const HoverDropdown = () => {
  const [show, setShow] = useState(false);
  const cookies = useCookies();
  const router=useRouter()
  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  const handleLogout=async()=>{
    localStorage.removeItem('toastShownBefore');
    localStorage.removeItem(auth.storageTokenKeyName);
    localStorage.removeItem(auth.storageRole);
    cookies.remove(auth.storageTokenKeyName)
    cookies.remove(auth.storageRole)
    router.replace("/login")
    
  }
  return (
    <div className="relative z-10">
      <button
        id="dropdownHoverButton"
        onClick={() => setShow(true)}
        onMouseEnter={handleMouseEnter}
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="text-black hover:text-white text-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
       <IoPersonCircleOutline className='w-6 h-6 mx-2'/> Account{' '}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      <div
        id="dropdownHover"
        className={`absolute top-full left-0 ${show ? '' : 'hidden'} mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
          <li>
            <Link href={'/dashboard/profile'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My profile</Link>
          </li>
          <li>
            <Link href={'/dashboard/order'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</Link>
          </li>
          <li>
            <Link href={'/dashboard'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Wishlist</Link>
          </li>
          <li>
            <button  onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HoverDropdown;
