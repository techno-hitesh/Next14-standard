import react,{useEffect,useState} from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { getSubCateProductByIdAPI} from '@/app/services/apis/user/categories'
import 'swiper/css';
import Link from "next/link";
import { dashboardLinks } from "@/app/configs/authLinks";

const Subcategory = ({key,data}:any) => {
    // console.log("subcat",data)
    const [subdata,setSubData]=useState<any>([])

    let subCatId = data?._id;
    
    const fetchsubbyid = async()=> {
        const response = await getSubCateProductByIdAPI(subCatId)
        if(response?.status===200){
            setSubData(response?.data?.Products)
        }
    }

    useEffect(()=>{
        fetchsubbyid()
    },[subCatId])


    return (
        <section className="py-4 relative" >
            <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-y-4 mb-5">
                    <h2 className="font-manrope font-bold text-4xl text-gray-900">{data?.subCategoryName}</h2>
                    <div className="flex justify-center items-center gap-6">
                        <button
                            className="swiper-button-prev rounded-full w-9 h-9 flex items-center justify-center p-2.5 bg-indigo-200 group transition-all duration-300 hover:bg-indigo-600">
                            <svg className="stroke-indigo-700 transition-all duration-300 group-hover:stroke-white"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M8.38449 15.1023L3.33337 10.0512M3.33337 10.0512L8.38449 5.00006M3.33337 10.0512H18.3333"
                                    stroke="" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="swiper-button-next rounded-full w-9 h-9 flex items-center justify-center p-2.5 bg-indigo-200 group transition-all duration-300 hover:bg-indigo-600">
                            <svg className="stroke-indigo-700 transition-all duration-300 group-hover:stroke-white"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M11.6155 5.00006L16.6667 10.0512M16.6667 10.0512L11.6155 15.1023M16.6667 10.0512L1.66675 10.0512"
                                    stroke="" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* <p className="font-normal text-base text-gray-500 max-w-4xl max-sm:text-center">
                    Nisl molestie facilisis pellentesque diam nulla nam vitae sapien. Ac cras aenean auctor molestie aliquet.
                    Cras non bibendum ultricies metus orci proin blandit a quis.
                </p> */}
            </div>
            <Swiper
                className="swiper mySwiper mb-10 py-10"
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                slidesPerView={2}
                centeredSlides
                loop
                spaceBetween={30}
                slideToClickedSlide
            >
                {subdata && subdata.length > 0 ? subdata.map((subval:any , index:number)=>(

                   <SwiperSlide>
                    <Link href={dashboardLinks.productsLink+'/'+subval?._id}>
                        <div className="w-full h-full max-h-[426px]">                            
                            <img src={subval?.productImg[0]} alt=""
                                className="w-full h-full object-fill mx-auto" />                        
                        </div>
                     </Link>
                    </SwiperSlide>
                ))
                :
                    ( "")
                }

            </Swiper>
            {/* <button
                className="flex items-center justify-center py-3.5 px-7 rounded-full font-semibold text-base text-white bg-indigo-600 shadow-sm shadow-transparent transition-all duration-300 hover:shadow-indigo-200 hover:bg-indigo-700 w-max mx-auto">
                View More
            </button> */}
        </section>
    );
};

export default Subcategory;