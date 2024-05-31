"use client"
import React,{useEffect,useState} from 'react'
import { getSubCategoryByIdAPI } from '@/app/services/apis/user/categories'
import Link from 'next/link'
import { dashboardLinks } from '@/app/configs/authLinks'

const SubCategory = ({ params }: { params: { id: any | string } } ) => {
    const [subCatData, setSubCatData] = useState<any>("");

    const getData = async()=>{
      const resp = await getSubCategoryByIdAPI(params.id);
      setSubCatData(resp.data.subCategories);
      console.log("getSubCategoryByIdAPI ",resp)
    } 
  
    useEffect(()=>{
      getData();
    },[]);


  return (
    <>
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">Our featured Aroma Range</h2>
          <p className="mt-4 text-base text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
    
        {subCatData.length > 0 && subCatData ?         
            subCatData.map((SubValue : any, i:number)=>(
          <article key={i} className="relative mt-4">
    
            <Link href={dashboardLinks.subCatProductLinks+SubValue._id}>
            <div className="aspect-square overflow-hidden">
              <img className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300" src={SubValue.subCategoryImg ? SubValue.subCategoryImg :""} alt="" />
            </div>
            <div className="absolute top-0 m-1 rounded-full bg-white">
              <p className="text-[10px] rounded-full bg-black p-1 font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">Sale</p>
            </div>
    
            <div className="mt-4 flex items-start justify-between">
              <div className="">
                <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                    {SubValue.subCategoryName}
                    <span className="absolute" aria-hidden="true"></span>
                </h3>
                <div className="mt-2 flex items-center">
                  <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>
                  <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>  
                  <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>  
                  <svg className="block h-3 w-3 align-middle text-black sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" className=""></path>
                  </svg>  
                </div>
    
                <p>{SubValue.subCategoryDescription.split(',')[0]}</p>
              </div>
            </div>    
            </Link>    
    
          </article>    
          ))        
          :""
        }  
        </div>
      </div>
    </section>      
        </>

  )
}

export default SubCategory