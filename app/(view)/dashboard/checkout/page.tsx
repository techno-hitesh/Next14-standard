"use client"
import React,{useState,useEffect} from 'react'
import { getToCartAPI,getItemInCartAPI } from '@/app/services/apis/user';
import { loadStripe } from '@stripe/stripe-js';
import { addressType } from '@/app/types/userTypes';
import { addAddressApi } from '@/app/services/apis/address';
import { toast,ToastContainer } from 'react-toastify';
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import CheckoutForm from '../components/checkoutForm/checkoutForm';
import { useSelector } from "react-redux";
import { jwtDecodeData } from '@/app/helpers';
import authConfig from '@/app/configs/auth';


const CheckoutPage = () => {

  const publishableKey:string|any =  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
  // const stripePromise = loadStripe(publishableKey);

  const userSelectData = useSelector((states:any) => states.users)
  let userCartId:any
  if(userSelectData?.cartId?.data !== undefined){
      userCartId = jwtDecodeData(userSelectData?.cartId?.data)
  }


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
    const cart = localStorage.getItem(authConfig.storageCart);
    const localCartId = jwtDecodeData(cart);
    const multiple=localStorage.getItem("multiple")
    userCartId = userCartId ? userCartId : localCartId;
    console.log("local cart",userCartId)
    console.log("multipe",multiple)  
    if(userCartId !="" && multiple==="false"){
  
      const resp = await  getItemInCartAPI(userCartId)
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

    }else if(multiple==="true"){
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
    
  }

  useEffect(() => {
    getAllCart()
  }, [])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log("name",name)
    setFormValue((prevProps: addressType) => ({
      ...prevProps,
      [name]: value
    }));
  }

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault()

    // console.log("formValue",formValue)
    // let errForm: {} | "" = validate(formValue);

    // if(!Object.keys(errForm).length){

    //   const resp = await addAddressApi(formValue);
    //   if(resp == 201){
    //     toast.error("all done")
    //     console.log("resp--",resp)
    //   }

    // }

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

  const validate = (values: any | {}) => {
    const errors: addressType | any = {};
    // console.log("values==--- validate--",values)

  //   {streetAddress: "",
  //   nearByAddress: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   areaPincode:"",
  //   mobileNumber:""    
  //  }

  // Validate nearByAddress
  if (!values.nearByAddress) {
    errors.nearByAddress = "Address is required.";
    toast.error("Address is required.")
  }

  if (!values.streetAddress) {
    errors.streetAddress = "Street address is required.";
    toast.error("Street address is required.")
  }

  // Validate country
  if (!values.country) {
    errors.country = "Country is required.";
    toast.error("Country is required.")
  }

  // Validate state
  if (!values.state) {
    errors.state = "State is required.";
    toast.error("State is required.")
  }

  // Validate city
  if (!values.city) {
    errors.city = "City is required.";
    toast.error("City is required.")
  }

  // Validate areaPincode
  if (!values.areaPincode) {
    errors.areaPincode = "Area pincode is required.";
    toast.error("Area pincode is required.")
  }

  // Validate mobileNumber
  if (!values.mobileNumber) {
    errors.mobileNumber = "Mobile number is required.";
    toast.error("Mobile number is required.")
  }
  if (!values.areaPincode) {
    errors.areaPincode = "Area pincode is required.";
    toast.error("Area pincode is required.")
  } else if (!/^\d+$/.test(values.areaPincode)) {
    errors.areaPincode = "Area pincode should contain only numbers.";
    toast.error("Area pincode should contain only numbers.")
  }

  // Validate mobileNumber
  if (!values.mobileNumber) {
    errors.mobileNumber = "Mobile number is required.";
    toast.error("Mobile number is required.")
  } else if (!/^\d+$/.test(values.mobileNumber)) {
    errors.mobileNumber = "Mobile number should contain only numbers.";
    toast.error("Mobile number should contain only numbers.")
  }


    return errors;
  }

  const innumber = (e :React.SyntheticEvent<HTMLFormElement>) =>{
    // const {name,value} = e;

    // console.log("number--",e)
  }

  return (
    <>
    <ToastContainer />
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
      <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
        <CheckoutForm />
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
