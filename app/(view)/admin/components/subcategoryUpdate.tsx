import { adminUpdateCategoryApi, adminUpdateProductApi, adminUpdateSubCategoryApi, getsubcategorybyidAPI } from '@/app/services/apis/admin/products'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const SubCategoryUpdate = ({ id, onUpdateSuccess }: { id: { id: any | string }, onUpdateSuccess: () => void }) => {
    const [showModal,setShowModal]=useState(false)
    const [des,setdes]=useState("")
    const fetchsuncategorybyId=async()=>{
        const response=await getsubcategorybyidAPI(id)
        if(response?.status===200){
          setdes(response?.data?.subCategoryDescription)
        }
    }

    const [productImage, setImage] = useState<string | null>(null)
       const handleImgupdate = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
        }
      }
      const handlesubmit=async(e:any)=>{
        e.preventDefault()
         let val={
           subCategoryImg:productImage,
           subCategoryDescription:des

         }
          console.log(val)
          const response=await adminUpdateSubCategoryApi(id,val)
          if(response?.status===200){
           setShowModal(false)
           onUpdateSuccess()
           
          }
         
       }

useEffect(()=>{
     fetchsuncategorybyId()
},[])
    return (
    <div>  
        <div className="flex justify-center ">
            <button id="deleteButton" data-modal-target="deleteModal" data-modal-toggle="deleteModal"  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" type="button" onClick={()=>setShowModal(true)}>
            Update
            </button>
        </div>


{showModal &&
<div id="deleteModal"   aria-hidden="true" className="    overflow-y-auto overflow-x-hidden fixed bg-gray-200 bg-opacity-30 right-0 left-0  z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div className="relative left-[40%]   top-[20%] p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button type="button" onClick={()=>setShowModal(false)} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div>
            <form className='p-4'>
       <div>
            <label htmlFor="categoryImg" className='font-bold text-lg'>Subcategory Image <span className='text-red-500'>*</span></label>
            <input type="file" className='my-3 border border-gray-200 py-1 px-2' name='subCategoryImg' required onChange={handleImgupdate} />
       </div>
       <div>
            <label htmlFor="category" className='font-bold text-lg'>Subcategory Desciption <span className='text-red-500'>*</span></label>
            <input type="text" className='my-3 border border-gray-200 py-1 px-2' name='subCategoryDescription' required value={des} onChange={(e)=>setdes(e.target.value)}/>
       </div>
     
            <div className="flex justify-center items-center space-x-4">
                <button onClick={()=>setShowModal(false)} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                </button>
                <button onClick={(e)=>handlesubmit(e)}  type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Update
                </button>
            </div>
      </form>
            </div>
        </div>
    </div>
<ToastContainer/>
</div>

}
    </div>

  )
}

export default SubCategoryUpdate