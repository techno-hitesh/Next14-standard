"use client"
import { useEffect, useState } from "react"
import { GetAllProductAPI } from "@/app/services/apis/admin/products"
import ProductCard from "../components/productCard"

const ProductsPage = () => {

    const [usrProducts, setUsrProducts] = useState("")

    const handleProducts = async() =>{
        const data = await GetAllProductAPI();
        setUsrProducts(data.data)
        // console.log(data)
    }
    
    useEffect(()=>{
      handleProducts();
    },[])

  return (
    <>
     {/* <div className="inline-flex"> */}
     {/* ProductsPage */}
     { usrProducts ?
        <ProductCard  usrProducts={usrProducts}/>
            :"Loading.."
      }
            
    {/* </div> */}
        
    
    </>
  )
}

export default ProductsPage