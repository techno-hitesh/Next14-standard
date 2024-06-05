/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import Link from "next/link";
import { dashboardLinks } from "@/app/configs/authLinks";
import { Getallcategories } from "@/app/services/apis/admin/products";
import { getAllCategoryAPI } from "@/app/services/apis/user/categories";
import "@/app/style/style.css"

const Des = () => {
    const [subdata, setSubData] = useState<any>([]);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);


    const fetchcategory = async () => {
        const response = await getAllCategoryAPI()
        if (response?.status === 200) {
            console.log(response)
            setSubData(response?.data)
        }
    };

    useEffect(() => {
        fetchcategory();
    }, []);

    return (
        <section className="py-2 relative" >
            <div className="w-full max-w-7xl px-4 lg:px-6 mx-auto">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-y-2 mb-3">
                    <h2 className="font-manrope font-bold text-2xl text-gray-900"></h2>
                    <div className="flex justify-center items-center gap-2">
                        <button ref={prevButtonRef}
                            className="swiper-button-prev rounded-full w-6 h-6 flex items-center justify-center p-1.5 custom-bg-color group transition-all duration-300 hover:custom-bg-color">
                            <svg className="stroke-black transition-all duration-300 group-hover:stroke-white"
                                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M8.38449 15.1023L3.33337 10.0512M3.33337 10.0512L8.38449 5.00006M3.33337 10.0512H18.3333"
                                    stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button ref={nextButtonRef}
                            className="swiper-button-next rounded-full w-6 h-6 flex items-center justify-center p-1.5 custom-bg-color group transition-all duration-300 hover:custom-bg-color">
                            <svg className="stroke-black transition-all duration-300 group-hover:stroke-white"
                                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M11.6155 5.00006L16.6667 10.0512M16.6667 10.0512L11.6155 15.1023M16.6667 10.0512L1.66675 10.0512"
                                    stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Swiper
                className="swiper mySwiper mb-10 py-8"
                modules={[Navigation]}
                navigation={{
                    nextEl: nextButtonRef.current,
                    prevEl: prevButtonRef.current,
                }}
                slidesPerView={7}
                centeredSlides={false}
                loop
                spaceBetween={10}

            >
                {subdata && subdata.length > 0 ? subdata.map((subval: any, index: number) => (
                    <SwiperSlide key={index} className="flex flex-col items-center">
                        <Link href={dashboardLinks.subcategoryLinks + '/' + subval?._id}>
                            <div className="w-30 h-28 mb-2">
                                <img src={subval?.categoryImg} alt=""
                                    className="w-full h-full object-cover" />
                            </div>
                        </Link>
                        <span className="text-sm text-center px-2">{subval?.categoryName}</span>
                    </SwiperSlide>
                ))
                    :
                    ("")
                }
            </Swiper>
        </section>
    );
};

export default Des;
