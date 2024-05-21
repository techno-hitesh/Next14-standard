import React,{useState,memo} from 'react'
import { EditIcon } from '@/public/svg/edit';
import { updateAddressAPI } from '@/app/services/apis/address';
import { CitySelect, CountrySelect, StateSelect, GetState } from "react-country-state-city";
import { addressType } from '@/app/types/userTypes';

const ModalCompo = (data:any) => {
    console.log("data--",data?.data)

    const formData = data?.data

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countryid, setCountryid] = useState(101);
    const [stateid, setstateid] = useState(0);
    
    const [objData, setObjData] = useState({
       stateName :formData.stateName,
       stateId :  formData.stateId,
       cityName : formData.cityName,
       cityId :   formData.cityId
    });

    const [formValue, setFormValue] = useState<addressType | any>({
      streetAddress: formData.streetAddress,
      nearByAddress: formData.nearByAddress,
      country: "india",
      areaPincode: formData.areaPincode,
      mobileNumber: formData.mobileNumber
  })


    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const updateAddressHanlder = async(e:React.SyntheticEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("update--",formData._id)

        // const resp = await updateAddressAPI(formData._id)
    }



  return (
    <>

        {/* <button
            type="button"
            className=" ml-auto py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={toggleModal}
         >
        + Add New Address
        </button> */}

        <button
            type="button"
            className=" ml-12 py-1 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-400 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={toggleModal}
         >
            <EditIcon/>
        </button>

        {/*  bg-gray-400 text-white px-2 py-1 rounded flex items-center */}

      {isModalOpen && (
        <div
          id="hs-basic-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="sm:max-w-lg sm:w-full bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 className="font-bold text-gray-800">Edit Address</h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>


            {/* body */}
            <div className="p-4">
              {/* <p className="mt-1 text-gray-800">
                This is a wider card with supporting text below as a natural lead-in to additional content.
              </p> */}

              <form className="space-y-4">
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Street Address</label>

                        <input type="text" name="streetAddress" id="streetAddress" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                        defaultValue={formData.streetAddress}

                        />

                    </div>

                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Near By Address</label>

                        <input type="text" name="nearByAddress" id="nearByAddress" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                        defaultValue={formData.nearByAddress}                        
                        />
                    </div>

                    

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Country</label>

                            <input type="text" name="country" id="country" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            defaultValue={formData.country}                        
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                             <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">mobileNumber</label>

                            <input type="text" name="mobileNumber" id="mobileNumber" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            maxLength={10} minLength={10}
                            defaultValue={formData.mobileNumber}                        
                            />
                        </div>

                    </div>
             
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">State</label>

                            <input type="text" name="country" id="country" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            defaultValue={formData.stateName}                        
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                             <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">City</label>

                            <input type="text" name="mobileNumber" id="mobileNumber" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            maxLength={10} minLength={10}
                            defaultValue={formData.cityName}                        
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                             <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Pincode</label>

                            <input type="text" name="areaPincode" id="areaPincode" className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="please enter your street address" required 
                            maxLength={6} minLength={6}
                            defaultValue={formData.areaPincode}                        
                            />
                        </div>

                    </div>

                </form>
            </div>




            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="submit"
                onClick={(e:any)=>updateAddressHanlder(e)}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 "
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ModalCompo)