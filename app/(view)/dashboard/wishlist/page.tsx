"use client"
import { DeleteWishListAPI, getuserWishlistAPI } from '@/app/services/apis/user'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getUserWishlist = async () => {
    try {
      const response = await getuserWishlistAPI();
      if (response?.status === 200) {
        console.log(response?.data)
        setWishlistData(response?.data);
        setLoading(false);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Error fetching wishlist");
    }
  };
const RemoveWishlist=async(id:any)=>{
  const response= await DeleteWishListAPI(id)
  if(response?.status===200){
 toast.success("Product Removed from Wishlist !")
    getUserWishlist() 
  }else{
    toast.error(response?.message)
  }
}
  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <div className='grid grid-cols-3'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        wishlistData.map((wishlistItem: any, index: number) => (
          <div key={index} className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
           <Link href={`/dashboard/products/${wishlistItem?.productId?._id}`}>
            <img className="h-48 w-full object-cover object-center" src={wishlistItem?.productId?.productImg[0]} alt="Product Image" />
           </Link>
            <div className="p-4">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{wishlistItem?.productName}</h2>
              <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{wishlistItem?.productId?.productDescription}</p>
              <div className="flex justify-between items-center">
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">₹{wishlistItem?.productId?.productPrice}</p>
                <button onClick={()=>RemoveWishlist(wishlistItem?._id)} className='flex justify-center items-center text-white bg-red-600 px-2 py-1 rounded-md'>Remove</button>

              </div>
            
            </div>
          </div>
        ))
      )}
      <ToastContainer/>
    </div>
  );
};

export default Wishlist;
