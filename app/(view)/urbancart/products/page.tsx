"use client"
import { useEffect, useState } from "react"
import { GetAllProductAPI } from "@/app/services/apis/admin/products"
import ProductCard from "../_components/productCard"

const ProductsPage = () => {

    const [usrProducts, setUsrProducts] = useState("")

    const handleProducts = async() =>{
      try {
        const data = await GetAllProductAPI();
        if(data.status ==200 && data.data.totalCount >0){
          setUsrProducts(data.data)
          console.log("handleProducts",data)    
        }
           
      } catch (error) {
        console.log("error handleProducts",error)
      }
    }
    
    useEffect(()=>{
      handleProducts();
    },[])

  return (
    <>
      <section id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      { usrProducts ?
          <ProductCard  usrProducts={usrProducts}/>
              :"Loading...."
        }
            
    </section>
        
    
    </>
  )
}

export default ProductsPage