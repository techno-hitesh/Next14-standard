"use client"
import ProductCard from '@/app/(view)/dashboard/components/productCard'
import { GetAllProductAPI, getproductBySearch } from '@/app/services/apis/admin/products'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Search from '../../components/search'

const Products = () => {
    
    const [usrProducts, setUsrProducts] = useState("")
    const [searchProducts,setsearchProdcuts]=useState([])
    const router=useRouter()
    const [show,setshow]=useState(false)
    const [search,setsearch]=useState("")
    const handleProducts = async() =>{
        const data = await GetAllProductAPI();
        setUsrProducts(data?.data)
    }
    const handlesubmit=async(e:any)=>{
        e.preventDefault()
        const response= await getproductBySearch(search)
        if(search===""){
          console.log("empty")
        }else if(response?.status!==200){
             toast.error(response?.message)
        }
        else{
          router.push(`/admin/products/search/${search}`)
        }
    }
    useEffect(()=>{
      handleProducts();
    },[])
  return (
    <>

    <div className='flex ml-10 justify-around'>
      <Search/>
    <Link href={'/admin/products/create'}>
     <button className='bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700'>Create Product</button>
     </Link>
    </div>
    <section id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
  { usrProducts   ?
      <ProductCard  usrProducts={usrProducts}/>
          :"Loading......"
    }
    
    </section>
    
  <ToastContainer/>  
    </>
  )
}

export default Products