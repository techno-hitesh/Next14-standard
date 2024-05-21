"use client"
import { Getallcategories, Getallsubcategories, adminCreateProductApi, getcategorybyidAPI } from '@/app/services/apis/admin/products';
import { category, subcategory } from '@/app/types/userTypes';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image'
import back from  "@/public/images/sub.jpeg"

const page = () => {
    const [productname, setName] = useState<any>('');
    const [productprice, setPrice] = useState('');
    const [productDescription, setDescription] = useState('');
    const [productStockQuantity, setquantity] = useState('');
    const [productImg, setImg] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] =useState("Please select a category")
    const [selectedsubOption, setSelectedsubOption] =useState("Please select a  sub category")
    const [categories,setcategories]= useState<category[]>([]);
    const [sub,setsub]=useState<subcategory[]>([])
    

    //submit function
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(productname===""|| productStockQuantity==='' || productprice==="" || productDescription==="" || productImg===null || selectedOption===""){
        toast.error("All fields are requried !")
        } else if (!isNaN(productname)) {
          toast.error("Enter valid name")
      }
        else{
          let data={
            categoryName:selectedOption,
            subCategoryName:selectedsubOption,
            productName:productname,
            productPrice:productprice,
            productDescription:productDescription,
            productImg:productImg,
            productStockQuantity:productStockQuantity
          }
          console.log(data)
          const respose=await adminCreateProductApi(data)
          if(respose?.status===201 || respose?.status===200){
            const input = document.querySelector('input[type="file"]');
                 if (input) {
                     (input as HTMLInputElement).value = '';
                 }
            toast.success("Product created successfully !")
            setName("") ,setDescription(""),setPrice(""),setImg(""),setquantity("")
            setSelectedOption("Please select a category")
            setSelectedsubOption("Please select a sub category")
          }else{
            toast.error("Network error")
          }
        }
      }

      //handle category takes name,and id,and pass to getcategorybyid
      const handlecategory = (name: string, id: string) => {
        setSelectedOption(name);
        getcategorybyid(id)
        // console.log(`Selected category name: ${name}, ID: ${id}`);
      };

      //getcategory by id
      const getcategorybyid=async(id:string)=>{
        const response=await getcategorybyidAPI(id)
        if(response?.status===200){
          subcategory(id)
        }
      else{
        toast.error("Network error")
      }
      }

      //Getting subcategory by id
      const subcategory=async(id:string)=>{
        const response=await Getallsubcategories(id)
        if(response?.status===200){
             setsub(response?.data.filter((el:any)=>el.categoryId==id))
        }
        else{
          toast.error("Network error")
        }
      
      }

      //image validation
      const handleImgChange = (e:any) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setImg(file);  
        } 
      };
      
      //getting all categories
      const category=async()=>{
        const response=await Getallcategories()
        if(response?.status===200){
          setcategories(response?.data)
        }else{
         toast.error("error")
        }
      }

      useEffect(()=>{
        category()
      },[])
  return (
     <div className='flex w-[120%]' >
    <div className=' p-8 border rounded-md border-gray-200'>
        <div className='flex flex-col justify-center items-center'>
        <span className=" text-gray-800 text-3xl my-4  font-bold ">Create Product</span>
          <div>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
              <div className='flex flex-col items-start'>
              <div className='w-[100%]'>
                      <div className="dropdown flex flex-col " >
                        <label htmlFor="category" className='font-semibold text-md text-gray-700'>Select a category <span className='text-pink-500'>*</span></label>  
                        <select className='px-3  py-2 my-2 rounded-md bg-gray-100 text-gray-800 ' value={selectedOption} onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            const categoryId = selectedOption.getAttribute('data-id');
                            if (categoryId) {
                              handlecategory(selectedOption.value, categoryId);
                            }
                          }}>
                          <option value="">Please select category</option>
                          {categories.map((option, index) => (
                            <option key={index} value={option.categoryName} data-id={option._id}>
                              {option.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="dropdown flex flex-col my-2">
                          <label htmlFor="subcategory" className='font-semibold text-md text-gray-700'>Select a sub category <span className='text-pink-500'>*</span></label>
                          <select className='px-3  py-2 my-1 rounded-md bg-gray-100 text-gray-800 ' value={selectedsubOption}  onChange={(e) => setSelectedsubOption(e.target.value)}>
                            <option value="">Please select sub category</option>
                            {sub.map((option, index:any) => (
                              <option key={index} value={option.subCategoryName}>
                                {option.subCategoryName}
                              </option>
                            ))}
                            </select>
                      </div>
            
                    </div>
                    <div  className='flex flex-col w-[100%] my-2'>
                      <label htmlFor="productName" className='font-semibold text-md text-gray-700'>Product name:<span className=' text-pink-500'>*</span></label>
                      <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-pink-200 placeholder:text-gray-700' placeholder="Enter product name" value={productname} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex flex-col w-[100%] my-2'>
                      <label htmlFor="productPrice" className='font-semibold text-md text-gray-700'>Product price:<span className=' text-pink-500'>*</span></label>
                      <input type="number" placeholder="Enter product price" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' value={productprice} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div  className='flex flex-col w-[100%] my-2'>
                      <label htmlFor="productDescription" className='font-semibold text-md text-gray-700'>Product description:<span className=' text-pink-500'>*</span></label>
                      <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' placeholder="Description" value={productDescription} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div  className='flex flex-col  my-2'>
                      <label htmlFor="productStockQuantity" className='font-semibold text-md text-gray-700'>Product Quantity:<span className=' text-pink-500'>*</span></label> 
                      <input type="number" min={1} className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' placeholder="Quantity"  value={productStockQuantity}  onChange={(e)=>setquantity(e.target.value)} />
                    </div>
                    <div  className='flex flex-col  my-2'>
                      <label htmlFor="productImg" className='font-semibold text-md text-gray-700'>Product Image:<span className=' text-pink-500'>*</span></label>
                      <input type="file"className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' placeholder="Image"   onChange={handleImgChange} />
                    </div>
                   </div>
                    <button type="submit" className='bg-blue-800 my-2 text-white  text-lg px-3 py-2 rounded-md'>Add Product</button>
            </form>
          </div>
          <ToastContainer/>
        </div>
    </div>
    <Image
         src={back}
         alt='Loading...'
         className='  w-[50%] rounded-md'
        />
     </div>
  )
}

export default page