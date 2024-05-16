
import { GetProductByIdAPI, Getallcategories } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'


const UpdateModal = ({ id }: { id: { id: any | string } }) => {
       const [showModal,setShowModal]=useState(false)
       const [name,setname]=useState("")
       const [description,setdescription]=useState("")
       const [price, setprice] = useState("")
       const [selectedOption, setSelectedOption] =useState("Please select a category")
      const getProductById=async()=>{
        const response=await GetProductByIdAPI(id)
        if(response?.status===200){
            allcategories()
            setname(response?.getProduct?.productName)
            setdescription(response?.getProduct?.productDescription)
            setprice(response?.getProduct?.productPrice)
        }
      }

      const allcategories=async()=>{
        const response=await Getallcategories()
        if(response?.status===200){

        }
        console.log(response)
      }

      const handlecategory = (name: string, id: string) => {
        setSelectedOption(name);
        getcategorybyid(id)
        console.log(`Selected category name: ${name}, ID: ${id}`);
      }
      const getcategorybyid=async(id:string)=>{
        const response=await getcategorybyidAPI(id)
        if(response?.status===200){
        //   subcategory(id)
        }
      else{
        // toast.error("error")
      }
      }
   useEffect(()=>{
    getProductById()
   },[])
  return (
  <>
  {/* <!-- Modal toggle --> */}
<div className="flex justify-center ">
    <button id="deleteButton" data-modal-target="deleteModal" data-modal-toggle="deleteModal"  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" type="button" onClick={()=>setShowModal(true)}>
    Update
    </button>
</div>

{/* <!-- Main modal --> */}
{showModal ? 
<div id="deleteModal"   aria-hidden="true" className="    overflow-y-auto overflow-x-hidden fixed bg-gray-200 bg-opacity-30 right-0 left-0  z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div className="relative left-[30%]   top-[10%] p-4 w-full max-w-md h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button type="button" onClick={()=>setShowModal(false)} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div>
            <form >
  
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Type product name" required />
              </div>
              <div className="w-full">
                 <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={description} onChange={(e)=>setdescription(e.target.value)} placeholder="Product Description" required />
             </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={price} onChange={(e)=>setprice(e.target.value)} placeholder="₹299" required />
              </div>
             <div>
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
                 <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Please Select Category</option>
                     <option value="TV">TV/Monitors</option>
                     <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>                     
                    <option value="PH">Phones</option>                 
                    </select>
             </div>
               <div>
                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                   <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="15" placeholder="Ex. 12" required />
              </div> 
            
          </div>

            <div className="flex justify-center items-center space-x-4">
                <button onClick={()=>setShowModal(false)} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                </button>
                <button  type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Update
                </button>
            </div>
      </form>
            </div>
        </div>
    </div>
</div>
: null
}
  </>
  )
}

export default UpdateModal

