"use client"
import { GetProductByIdAPI } from '@/app/services/apis/admin/products'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { reviewADdAPi } from '@/app/services/apis/user'
import Link from 'next/link'


const labels: { [index: string]: string } = {
  
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


function getLabelText(value: number) {
  return `${value}  Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Review = () => {
    const {id}=useParams()
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    const [image,setimage]=useState<any>([])
    const [img,setimg]=useState("")
    const [text,settext]=useState("")
     const [data,setdata]=useState<any>({})
    const getpoductByID=async()=>{
       const response=await GetProductByIdAPI(id)
       if(response?.status===200){
        console.log(response?.getProduct)
        setdata(response?.getProduct)
        setimage(response?.getProduct?.productImg[0])
      
       }else{
        toast.error("Something went wrong !")
       }
      
    }
     
   const handlesubmit=async(e:any)=>{
    e.preventDefault()
    const body={
            productId:id,
           productImg:img,
            comment:text,
            rating:value
    }
    const response=await reviewADdAPi(body)
    if(response?.status===201){
      toast.success(response?.message)
    }else{
      toast.error(response?.message)
    }
   }
    useEffect(()=>{
     getpoductByID()
    },[id])
  return (
    <>
    <div className='flex flex-col  border border-md p-7'>
       <Link href={`/dashboard/products/${id}`}>
       
        <div>
          <div className='flex  items-center gap-5'>
            <img src={image} alt="" className='w-16 h-16 rounded-full'/>
            <h1 className='font-bold text-lg'>{data?.productName}</h1>
          </div>
        </div>      
       
       </Link>
      
      <div className='my-10'>
        <form className='flex flex-col gap-10'>
          <div className='flex flex-col gap-1'>
          <label className='font-bold text-xl mt-4' htmlFor="Ratings">Ratings</label>
      <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
      </Box>

          </div>
       <div className='flex flex-col '>
        <label htmlFor="img" className='font-semibold text-lg my-2'>Product Image</label>
        <input type="file" placeholder='Image' value={img} onChange={(e)=>setimg(e.target.value)}/>
       </div>
         <div className='flex flex-col'>
             <h2 className='font-bold text-lg '>Write review</h2>
             <textarea name="Description"  value={text} onChange={(e)=>settext(e.target.value)}  className='border outline-none border-gray-100' id=""></textarea>
         </div>
         <button onClick={handlesubmit} className='bg-blue-100 font-bold text-blue-800 rounded-md w-fit px-3 py-2' type='submit'>Submit</button>
        </form>
      </div>
     <ToastContainer/>
    </div> 
    </>
  )
}

export default Review