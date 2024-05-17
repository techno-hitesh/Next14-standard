"use client"
import { Getallcategories, Getallsubcategories, adminCreateProductApi, getcategorybyidAPI } from '@/app/services/apis/admin/products';
import { category, subcategory } from '@/app/types/userTypes';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const page = () => {
    const [createerror,setcreaterror]=useState("")
    const [productname, setName] = useState('');
    const [productprice, setPrice] = useState('');
    const [productDescription, setDescription] = useState('');
    const [productImg, setImg] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] =useState("Please select a category")
    const [selectedsubOption, setSelectedsubOption] =useState("Please select a  sub category")
    const [categories,setcategories]= useState<category[]>([]);
    const [sub,setsub]=useState<subcategory[]>([])
    

    //submit function
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(sub)
        if(productname==="" || productprice==="" || productDescription==="" || productImg===null || selectedOption===""){
          setcreaterror("All fields are requried !")
        }else{
           setcreaterror("")
          let data={
            categoryName:selectedOption,
            subCategoryName:selectedsubOption,
            productName:productname,
            productPrice:productprice,
            productDescription:productDescription,
            productImg:productImg
          }
          console.log(data)
          const respose=await adminCreateProductApi(data)
          if(respose?.status===201 || respose?.status===200){
            toast.success("Product created successfully !")
            setName("") ,setDescription(""),setPrice(""),setImg("")
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
    <div className='m-4 p-4 '>
        <div className='flex flex-col justify-center items-center'>
        <span className="bg-pink-100 text-pink-800 text-2xl my-4  font-bold me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Create Product</span>
          <div>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
              <div className='flex flex-col items-start'>
              <div className='w-[100%]'>
                      <div className="dropdown flex flex-col " >
                        <label htmlFor="category" className='font-semibold text-md text-pink-700'>Select a category <span className='text-pink-500'>*</span></label>  
                        <select className='px-3  py-1 my-2 rounded-md bg-pink-100 text-pink-800 ' value={selectedOption} onChange={(e) => {
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
                          <label htmlFor="subcategory" className='font-semibold text-md text-pink-700'>Select a sub category <span className='text-pink-500'>*</span></label>
                          <select className='px-3  py-1 my-1 rounded-md bg-pink-100 text-pink-800 ' value={selectedsubOption}  onChange={(e) => setSelectedsubOption(e.target.value)}>
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
                      <label htmlFor="productName" className='font-semibold text-md text-pink-700'>Product name:<span className=' text-pink-500'>*</span></label>
                      <input type="text" className='px-3 py-0.5 my-2 rounded-md bg-pink-100 text-pink-800  border border-pink-200 placeholder:text-pink-700' placeholder="Enter product name" value={productname} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex flex-col w-[100%] my-2'>
                      <label htmlFor="productPrice" className='font-semibold text-md text-pink-700'>Product price:<span className=' text-pink-500'>*</span></label>
                      <input type="number" placeholder="Enter product price" className='px-3 py-0.5 my-2 rounded-md bg-pink-100 text-pink-800  border border-pink-200 placeholder:text-pink-700' value={productprice} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div  className='flex flex-col w-[100%] my-2'>
                      <label htmlFor="productDescription" className='font-semibold text-md text-pink-700'>Product description:<span className=' text-pink-500'>*</span></label>
                      <input type="text" className='px-3 py-0.5 my-2 rounded-md bg-pink-100 text-pink-800  border border-pink-200 placeholder:text-pink-700' placeholder="Description" value={productDescription} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div  className='flex flex-col  my-2'>
                      <label htmlFor="productImg" className='font-semibold text-md text-pink-700'>Product Image:<span className=' text-pink-500'>*</span></label>
                      <input type="file"className='px-3 py-0.5 my-2 rounded-md bg-pink-100 text-pink-800  border border-pink-200 placeholder:text-pink-700' placeholder="Image"   onChange={handleImgChange} />
                    </div>
                   </div>
                    {createerror ? <p className='text-red-600 animate-bounce'>{createerror}</p>:null}
                    <button type="submit" className='bg-pink-100 my-2 text-pink-800 font-bold text-lg px-2 py-1 rounded-md'>Add Product</button>
            </form>
          </div>
          <ToastContainer/>
        </div>
    </div>
  )
}

export default page