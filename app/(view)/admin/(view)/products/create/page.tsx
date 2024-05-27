"use client"
import { Getallcategories, Getallsubcategories, adminCreateProductApi, getcategorybyidAPI } from '@/app/services/apis/admin/products';
import { category, subcategory } from '@/app/types/userTypes';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image'
import back from "@/public/images/sub.jpeg"

const Page = () => {
  const [productname, setName] = useState<any>('');
  const [productprice, setPrice] = useState('');
  const [productDescription, setDescription] = useState<any>('');
  const [productStockQuantity, setquantity] = useState('');
  const [productBrand, setproductBrand] = useState<any>('');
  const [productShortDescription, setShortDescription] = useState<any>('');
  const [productFeature, setFeature] = useState<any>('');
  const [productImgs, setImgs] = useState<File[]>([]);
  const [selectedOption, setSelectedOption] = useState("Please select a category")
  const [selectedsubOption, setSelectedsubOption] = useState("Please select a sub category")
  const [categories, setcategories] = useState<category[]>([]);
  const [sub, setsub] = useState<subcategory[]>([])
  const [pending,setpending]=useState(false)


  //submit function
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (productname === "" || productStockQuantity === '' || productprice === "" || productDescription === "" || productImgs.length === 0 || selectedOption === ""
      || productBrand === "" || productShortDescription === "" || productFeature === ""
    ) {
      toast.error("All fields are required!")
    } else if (!isNaN(productname)) {
      toast.error("Enter valid name")
    } else if (!isNaN(productBrand)) {
      toast.error("Enter valid Brand")
    } else if (!isNaN(productFeature)) {
      toast.error("Enter valid feature")
    } else if (!isNaN(productShortDescription) || !isNaN(productDescription)) {
      toast.error("Enter valid description")
    }else if (parseFloat(productprice) < 0) {
      toast.error("Product price cannot be negative");
    } 
    else {
      setpending(true)
      const data = new FormData();
      data.append('categoryName', selectedOption);
      data.append('subCategoryName', selectedsubOption);
      data.append('productName', productname);
      data.append('productPrice', productprice);
      data.append('productDescription', productDescription);
      data.append('productStockQuantity', productStockQuantity);
      data.append('productBrand', productBrand);
      data.append('productShortDescription', productShortDescription);
      data.append('productFeature', productFeature);
      productImgs?.forEach((img) => {
        data.append('productImg', img);
      });

      console.log(data)
      const response = await adminCreateProductApi(data)
      if (response?.status === 201 || response?.status === 200) {
        const input = document.querySelector('input[type="file"]');
        if (input) {
          (input as HTMLInputElement).value = '';
        }
        toast.success("Product created successfully!")
        setpending(false)
        setName(""), setDescription(""), setPrice(""), setImgs([])
        setquantity(""),setproductBrand(""),setShortDescription(""),setFeature("")
        setSelectedOption("Please select a category")
        setSelectedsubOption("Please select a sub category")
      } else {
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
  const getcategorybyid = async (id: string) => {
    const response = await getcategorybyidAPI(id)
    if (response?.status === 200) {
      subcategory(id)
    }
    else {
      toast.error("Network error")
    }
  }

  //Getting subcategory by id
  const subcategory = async (id: string) => {
    const response = await Getallsubcategories(id)
    if (response?.status === 200) {
      setsub(response?.data.filter((el: any) => el.categoryId == id))
    }
    else {
      toast.error("Network error")
    }

  }

  //image validation
  const handleImgChange = (e: any) => {
    const files:any = Array.from(e.target.files);
    setImgs(files);
  };

  //getting all categories
  const category = async () => {
    const response = await Getallcategories()
    if (response?.status === 200) {
      setcategories(response?.data)
    } else {
      toast.error("error")
    }
  }

  useEffect(() => {
    category()
  }, [])
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
                    <select className='px-3  py-2 my-1 rounded-md bg-gray-100 text-gray-800 ' value={selectedsubOption} onChange={(e) => setSelectedsubOption(e.target.value)}>
                      <option value="">Please select sub category</option>
                      {sub.map((option, index: any) => (
                        <option key={index} value={option.subCategoryName}>
                          {option.subCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
                <div className='flex flex-col w-[100%] my-2'>
                  <label htmlFor="productName" className='font-semibold text-md text-gray-700'>Product name:<span className=' text-pink-500'>*</span></label>
                  <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-pink-200 placeholder:text-gray-700' placeholder="Enter product name" value={productname} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex flex-col w-[100%] my-2'>
                  <label htmlFor="productPrice" className='font-semibold text-md text-gray-700'>Product price:<span className=' text-pink-500'>*</span></label>
                  <input type="number" min={1} placeholder="Enter product price" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' value={productprice} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='flex flex-col w-[100%] my-2'>
                  <label htmlFor="productDescription" className='font-semibold text-md text-gray-700'>Product description:<span className=' text-pink-500'>*</span></label>
                  <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' placeholder="Description" value={productDescription} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='flex flex-col  my-2'>
                  <label htmlFor="productStockQuantity" className='font-semibold text-md text-gray-700'>Product Quantity:<span className=' text-pink-500'>*</span></label>
                  <input type="number" min={1} className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' placeholder="Quantity" value={productStockQuantity} onChange={(e) => setquantity(e.target.value)} />
                </div>
                <div className='flex flex-col w-[100%] my-2'>
                  <label htmlFor="productBrand" className='font-semibold text-md text-gray-700'>Product brand:<span className=' text-pink-500'>*</span></label>
                  <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-pink-200 placeholder:text-gray-700' placeholder="Enter product brand" value={productBrand} onChange={(e) => setproductBrand(e.target.value)} />
                </div>
                <div className='flex flex-col w-[100%] my-2'>
                  <label htmlFor="productShortDescription" className='font-semibold text-md text-gray-700'>Product ShortDescription:<span className=' text-pink-500'>*</span></label>
                  <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-pink-200 placeholder:text-gray-700' placeholder="Enter product name" value={productShortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                </div>
                <div className='flex flex-col w-[100%] my-2'>
                  <label htmlFor="productFeature" className='font-semibold text-md text-gray-700'>Product Feature:<span className=' text-pink-500'>*</span></label>
                  <input type="text" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-pink-200 placeholder:text-gray-700' placeholder="Enter product name" value={productFeature} onChange={(e) => setFeature(e.target.value)} />
                </div>
                <div className='flex flex-col  my-2'>
                  <label htmlFor="productImg" className='font-semibold text-md text-gray-700'>Product Image:<span className=' text-pink-500'>*</span></label>
                  <input type="file" className='px-3 py-2 my-2 rounded-md bg-gray-100 text-gray-800  border border-gray-200 placeholder:text-gray-700' multiple onChange={handleImgChange} />
                </div>
              </div>
              <button type="submit" className='bg-blue-800 my-2 text-white flex justify-center items-center w-[40%] text-lg px-3 py-2 rounded-md'>
                {pending ?
                <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg> :"Add Product"}
                </button>
            </form>
          </div>
          <ToastContainer />
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

export default Page