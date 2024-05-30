"use client"
import React,{useEffect,useState} from 'react'
import { getSubCateProductByIdAPI } from '@/app/services/apis/user/categories'
import Link from 'next/link'
import { dashboardLinks } from '@/app/configs/authLinks'

const subCateProducts = ({ params }: { params: { id: any | string } } ) => {
    const [subCatProduct, setSubCatProduct] = useState<any>("");

    const getData = async()=>{
      const resp = await getSubCateProductByIdAPI(params.id);
      setSubCatProduct(resp.data.Products);
      console.log("getSubCateProductByIdAPI ",resp.data.Products)
    } 
  
    useEffect(()=>{
      getData();
    },[]);


  return (
    <>
    <section id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
    {subCatProduct.length > 0  && subCatProduct  ? 
      
      subCatProduct.map((data:any,i:any)=>(     
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={data._id}>
         
          <Link href={dashboardLinks.productsLink+"/"+data._id}>
              <img  src={data?.productImg[0]}
                      alt="Product" className="h-72 w-72 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-72">
                  <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                  <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-black truncate capitalize flex-grow">
                      {data.productName.split(',')[0]}
                      <span className="font-bold" style={{float:"right"}}>
                      ₹ {data.productPrice}
                      </span>
                  </p>
                  </div>
                

                  {/* <p className='font-thin text-sm my-2'>{data.productDescription[0].toUpperCase()+data.productDescription.slice(1)}</p> */}
                  
                  {/* <div className="mt-2 mb-5 flex items-center justify-between">
    <p>
      <span className="text-2xl font-bold text-slate-900">₹{data.productPrice}</span>
      <span className="text-xs text-slate-900 line-through">₹{data.productPrice-40}</span>
    </p>
    <div className="flex items-center">
      <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
    </div> */}
  {/* </div> */}
                  <div className="flex items-center">
                  {/* <button className="custom-button-primary" onClick={(e)=>handleCart(e,data._id)} >
                  Preview...</button>  */}
                      {/* <p className="text-lg font-semibold text-black cursor-auto my-3">$149</p>
                      <del>
                          <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                      </del> 
                     <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                              <path fillRule="evenodd"
                                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                              <path
                                  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg></div> */}
                  </div>
              </div>
          </Link>
      </div>

    
  ))

  : "Loading...."
  }
</section>

</>

  )
}

export default subCateProducts