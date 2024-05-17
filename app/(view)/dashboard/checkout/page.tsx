"use client"
import React,{useState,useEffect} from 'react'
import { getToCartAPI } from '@/app/services/apis/user';
import { loadStripe } from '@stripe/stripe-js';
import { addressType } from '@/app/types/userTypes';
import { addAddressApi } from '@/app/services/apis/address';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {

  const publishableKey:string|any =  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  // const stripePromise = loadStripe(publishableKey);

  const [getAllData, setGetAllData] = useState<any|[]>([])
  const [subTotal, setSubTotal]     = useState("")

  const [formValue, setFormValue] = useState<addressType | any>({
     streetAddress: "",
     nearByAddress: "",
     country: "",
     state: "",
     city: "",
     areaPincode:"",
     mobileNumber:""    
    })


  const getAllCart = async () => {
    const resp = await getToCartAPI();
    if (resp.status == 200) {
      const datas = resp.data.cartItems.filter((data:any)=>{
        if(data.message !== "Product not found"){
            return data
        }
      })
      // console.log("datas",datas)
      setGetAllData(datas)
      setSubTotal(resp.data.totalCartAmount);
    }
  }

  useEffect(() => {
    getAllCart()
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name",name)
    setFormValue((prevProps: addressType) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log("formValue",formValue)
    const resp = await addAddressApi(formValue);
    toast.error(resp)
    console.log("resp--",resp)

  }



  const createCheckOutSession = async () => {
    console.log("getAllData")

    // let formattedData
    // if(getAllData.length ===1){
    //     formattedData = {
    //         totalProduct:[
    //             {
    //                 "cartId":getAllData[0]?._id,
    //                 "productId": getAllData[0]?.productDetails?.productId,
    //                 "productName": getAllData[0]?.productDetails?.productName,
    //                 "productPrice": getAllData[0]?.productDetails?.productPrice,
    //                 "productDescription": getAllData[0]?.productDetails?.productDescription,
    //                 "productQuantity":getAllData[0]?.quantity,
    //                 "itemPrice":getAllData[0]?.itemPrice
    //             }                
    //         ],
    //         "totalCartAmount": subTotal
    //     }

    // }else if(getAllData.length >1){
    //     const totalProduct  = getAllData.map((cartItem:any)=>(
    //         {
    //             "cartId":cartItem?._id,
    //             "productId": cartItem?.productDetails?.productId,
    //             "productName": cartItem?.productDetails?.productName,
    //             "productPrice": cartItem?.productDetails?.productPrice,
    //             "productDescription": cartItem?.productDetails?.productDescription,
    //             "productQuantity":cartItem?.quantity,
    //             "itemPrice":cartItem?.itemPrice
    //         }
    //     ))

    //     const totalCartAmount = subTotal
    //     formattedData = {
    //       totalProduct,
    //       totalCartAmount
    //     };

    // }

    // const stripe:any = await stripePromise;

    // const checkoutSession = await stripeSessionAPI(formattedData);

    // console.log("checkoutSession*********",checkoutSession,"********",checkoutSession.sessionId)
    // if(checkoutSession.status == 201){

    //     const result = await stripe.redirectToCheckout({
    //         sessionId: checkoutSession.sessionId,
            
    //     });

    //     if (result.error) {
    //     alert(result.error.message);
    //     }
    // }
    
  };


  return (
    <>
    <div className="relative mx-auto w-full bg-white">
  <div className="grid min-h-screen grid-cols-10">
    <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
      <div className="mx-auto w-full max-w-lg">

        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Secure Checkout<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>


        <form className="mt-10 flex flex-col " onSubmit={handleSubmit}>

          {/* <div>
            <label htmlFor="text" className="text-xs font-semibold text-gray-500">Full Name</label>
            <input type="text" id="text" name="address" placeholder="please enter your address" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
          </div> */}

          <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="text-xs font-semibold text-gray-500" htmlFor="grid-first-name">
              Address
            </label>
            <input name="nearByAddress" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-first-names" type="text" placeholder="please enter your address"
             value={formValue?.nearByAddress}
             onChange={(e) => handleChange(e)}
            />
         
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="text-xs font-semibold text-gray-500" htmlFor="grid-last-name">
              Street Address
            </label>
             <input name="streetAddress" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-last-name" type="text" placeholder="please enter your street address" 
              value={formValue.streetAddress}
              onChange={(e) => handleChange(e)}
             
             />
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xs font-semibold text-gray-500" htmlFor="grid-city">
                  Country
                </label>
                <input name="country" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="Country"
                 value={formValue.country}
                 onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xs font-semibold text-gray-500" htmlFor="grid-city">
                  Mobile No
                </label>
                <input name="mobileNumber" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="Mobile No"
                 value={formValue.mobileNumber}
                 onChange={(e) => handleChange(e)}
                />
              </div>

        </div>

          <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="text-xs font-semibold text-gray-500" htmlFor="grid-city">
                  City
                </label>
                <input name="city" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="City"
                 value={formValue.city}
                 onChange={(e) => handleChange(e)}
                
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="text-xs font-semibold text-gray-500" htmlFor="grid-state">
                  State
                </label>
                
                <div className="relative">
                <input name="state" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-city" type="text" placeholder="State"
                 value={formValue.state}
                 onChange={(e) => handleChange(e)}
                />
                  {/* <select name="state" id="state" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select> */}
                </div>
              </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="text-xs font-semibold text-gray-500" htmlFor="grid-zip">
                Pincode
              </label>
              <input  name="areaPincode" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" id="grid-zip" type="text" placeholder="Pincode"
               value={formValue.areaPincode}
               onChange={(e) => handleChange(e)}
              />
            </div>
          </div>       

           <button type="submit" className="mt-10 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>  
        
        </form>
        
        {/* <p className="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a></p> */}

       

      </div>
    </div>



      {/* products listing start */}
    
    <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
      <h2 className="text-white mb-4" style={{zIndex:9}}>Order summary</h2>

      <div>
        <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-3/4 w-full object-cover" />
        <div className="absolute inset-0 h-3/4 w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
      </div>


      <div className="relative">

        <ul className="space-y-5">

        {getAllData && getAllData.length > 0 ? getAllData.map((data: any) => (
          <li className="flex justify-between" key={data?.productDetails?.productId}>
            <div className="inline-flex">
              <img src={data?.productDetails.productImage} alt="" className="max-h-16" />
              <div className="ml-3">
                <p className="text-base font-semibold text-white">{data?.productDetails?.productName}</p>
                <p className="text-sm font-medium text-white text-opacity-80"> Qty {data?.quantity}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-white">₹ {data?.productDetails?.productPrice}</p>
          </li>

        )):""}

        </ul>

        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
        <div className="space-y-2">
          <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>₹ {subTotal!="" ? subTotal : ""}</span></p>
          {/* <p className="flex justify-between text-sm font-medium text-white"><span>Vat: 10%</span><span>₹55.00</span></p> */}
        </div>
      </div>

      {/* <div className="relative mt-10 text-white">
        <h3 className="mb-5 text-lg font-bold">Support</h3>
        <p className="text-sm font-semibold">+01 653 235 211 <span className="font-light">(International)</span></p>
        <p className="mt-1 text-sm font-semibold">support@nanohair.com <span className="font-light">(Email)</span></p>
        <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
      </div>
      <div className="relative mt-10 flex">
        <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
      </div> */}


    </div>

    {/* products listing end */}

  </div>
</div>

    </>
  )
}

export default CheckoutPage
