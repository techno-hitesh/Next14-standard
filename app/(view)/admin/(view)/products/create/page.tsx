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
    const [createer,setcreateer]=useState("")
    const [selectedOption, setSelectedOption] =useState("Please select a category")
    const [selectedsubOption, setSelectedsubOption] =useState("Please select a  sub category")
    const [categories,setcategories]= useState<category[]>([]);
    const [sub,setsub]=useState<subcategory[]>([])
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(sub)
        if(productname==="" || productprice==="" || productDescription==="" || productImg==="" || selectedOption===""){
          console.log("all fields are requreid")
          setcreaterror("All fields are requried !")
        }else{
           setcreaterror("")
          const formData = new FormData();
          formData.append('categoryName',selectedOption);
          formData.append("subCategoryName",selectedsubOption)
          formData.append('productName', productname);
          formData.append('productPrice', productprice);
          formData.append('productDescription', productDescription);
         
          if (productImg) {
            formData.append('productImg', productImg);
          }
          let data={
            categoryName:selectedOption,
            subcategoryName:selectedsubOption,
            productName:productname,
            productPrice:productprice,
            productDescription:productDescription,
            productImg:productImg
          }
          console.log(data)
          const respose=await adminCreateProductApi(data)
       
         
        }
        
      }
      const handlecategory = (name: string, id: string) => {
        setSelectedOption(name);
        getcategorybyid(id)
        console.log(`Selected category name: ${name}, ID: ${id}`);
      };

      const getcategorybyid=async(id:string)=>{
        const response=await getcategorybyidAPI(id)
        if(response?.status===200){
          subcategory(id)
        }
      else{
        toast.error("error")
      }
      }
      const subcategory=async(id:string)=>{
        const response=await Getallsubcategories(id)
        if(response?.status===200){
             setsub(response?.data.filter((el:any)=>el.categoryId==id))
        }
        else{
          toast.error("error")
        }
      
      }
      const handleImgChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          setImg(file);
        } else {
          setImg(null);
        }
      };
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
    <div>
         <div >
          <h1>Create Product</h1>
          <div>
          <form onSubmit={handleSubmit}>
          <div>
      
          <div className="dropdown">
    <label htmlFor="category">Select a category</label>  
    <select value={selectedOption} onChange={(e) => {
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
      <div className="dropdown">
        <label htmlFor="subcategory">Select a sub category</label>
        <select value={selectedsubOption}  onChange={(e) => setSelectedsubOption(e.target.value)}>
          <option value="">Please select sub category</option>
          {sub.map((option, index:any) => (
            <option key={index} value={option.subCategoryName}>
              {option.subCategoryName}
            </option>
          ))}
          </select>
      </div>
  
    </div>
        <label htmlFor="productName">Product name:</label>
        <input type="text" placeholder="Enter product name" value={productname} onChange={(e) => setName(e.target.value)} />
        <div>
          <label htmlFor="productPrice">Product price</label>
          <input type="number" placeholder="Enter product price" value={productprice} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor="productDescription">Product description</label>
          <input type="text" placeholder="Description" value={productDescription} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="productImg">Product Image</label>
          <input type="file" placeholder="Image" onChange={handleImgChange} />
        </div>
        {createerror ? <p>{createerror}</p> : null}
        {createer ? <p>{createer}</p>:null}
        <button type="submit">Add Product</button>
      </form>
          </div>
          <ToastContainer/>
        </div>
    </div>
  )
}

export default page