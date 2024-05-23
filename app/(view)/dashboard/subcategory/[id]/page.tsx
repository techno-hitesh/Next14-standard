"use client"
import React,{useEffect} from 'react'
import { getSubCategoryByIdAPI } from '@/app/services/apis/user/categories'

const subCategory = ({ params }: { params: { id: any | string } } ) => {
  
    const getData = async()=>{
      const resp = await getSubCategoryByIdAPI(params.id);
      console.log("getSubCategoryByIdAPI ",resp)
    } 
  
    useEffect(()=>{
      getData();
    },[]);


  return (
    <div>subCategory  {params.id}</div>
  )
}

export default subCategory