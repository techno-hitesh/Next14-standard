import { UpdateProfileAdminApi} from '@/app/services/apis/admin/products'
import { UserRoleAPI } from '@/app/services/apis/user'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Spiner from '../../admin/components/spiner'

const UpdateProfile = ({onUpdateSuccess }: {onUpdateSuccess: () => void }) => {
       const [showModal,setShowModal]=useState(false)
       const [name,setname]=useState("")
       const [number,setnumber] = useState("")
       const [Image, setImage] = useState<string | null>(null)
       const [pending,setpending]=useState(false)
       const [address,setaddress]=useState("")
      const getuser=async()=>{
        const response=await UserRoleAPI()
        if(response?.status===200){
            setname(response?.userData?.fullName)
            setnumber(response?.userData?.mobileNumber)
            setaddress(response?.userData?.address)
        }
      }
      const handleImgupdate = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
        }
      }
      const handlesubmit=async(e:any)=>{
        e.preventDefault()
        if (/\d/.test(name)) {
            toast.error("Enter Valid Name");
            
        }
      else{
            setpending(true)
            let val={
              fullName:name,
              mobileNumber:number,
              profileImg:Image,
              address:address
            }
             const response=await UpdateProfileAdminApi(val)
             if(response?.status===200){
               setShowModal(false)
               setpending(false)
               toast.success("Updated Successfully !")
               onUpdateSuccess()
             }else{
              setpending(false)
              toast.error(response?.message)
             }
        }
    }
    const handleInputChange = (e:any) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 10) {
          setnumber(inputValue);
        }
      };
    
   useEffect(()=>{
    getuser()
   },[])
  return (
  <>
  {/* <!-- Modal toggle --> */}
<div className="flex justify-center ">
    <button id="deleteButton" data-modal-target="deleteModal" data-modal-toggle="deleteModal"  className="h-[65%] mt-4 bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-md  hover:bg-gray-800 dark:hover:bg-gray-700" type="button" onClick={()=>setShowModal(true)}>
    Update
    </button>
</div>


 

{/* <!-- Main modal --> */}
{showModal &&
           
<div id="deleteModal" aria-hidden="true" className="overflow-y-auto  overflow-x-hidden fixed bg-gray-200 bg-opacity-30 right-0 left-0  z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
  
  {pending && 
<Spiner/>
}
    <div  hidden={pending ? true : false} className="relative left-[40%]    top-[10%] p-4 max-w-md h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white text-center w-[130%] rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button type="button" onClick={()=>setShowModal(false)} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div>
            <form >
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Name" required />
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={address} onChange={(e)=>setaddress(e.target.value)} placeholder="Address" required />
              </div>
              <div className="w-full ">
                  <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={number} onChange={(e)=>handleInputChange(e)} placeholder="Mobile Number" required />
              </div>
              <div>
          <label htmlFor="productImg">Product Image</label>
          <input type="file" placeholder="Image"  onChange={handleImgupdate} />
        </div>
          </div>
               
            <div className="flex justify-center items-center space-x-4">
                <button onClick={()=>setShowModal(false)} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                </button>
                <button onClick={handlesubmit} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Update
                </button>
            </div>
      </form>
            </div>
        </div>
        <ToastContainer/>
    </div>
</div>

}
  </>
  )
}

export default UpdateProfile

