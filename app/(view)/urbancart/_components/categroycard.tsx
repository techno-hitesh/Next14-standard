"use client";
import React, { useEffect, useState } from "react";
import { getAllCategoryAPI } from "@/app/services/apis/user/categories";
import Carousel from "./carousel";
import { Getallsubcategory } from "@/app/services/apis/admin/products";
import Subcategory from "./subcategory";
import Logo from "@/app/(view)/_components/logo";

const CategoryCard = () => {
  const [catData, setCatData] = useState<any>("");
  const [sub, setsub] = useState<any>([])

  const getData = async () => {
    const categories = await getAllCategoryAPI();
    setCatData(categories.data);
  };

  const getallSubcategories = async () => {
    const response = await Getallsubcategory();
    if (response?.status === 200) {
      setsub(response?.data)
    }
  };


  useEffect(() => {
    getData();
    getallSubcategories();
  }, []);

  return (
    <>
      <section className="bg-white text-gray-700 ">
        <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Our featured Aroma Range
            </h2>
            <p className="mt-4 text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              faucibus massa dignissim tempus.
            </p>
          </div>
          <div className="my-4 mb-4">
            <Carousel />
          </div>
          <div className="py-4">
            <Logo/>
          </div>
          <hr />
          <div>
          <img draggable="false" className="image-image undefined " src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/5/28/0efc48ea-42c8-496b-82d5-863e9271fc101716906763403-OMG.jpg" />
          </div>
          {sub.map((data: any, index: any) => (
            <div key={index} className=" flex mt-10  flex-col">
              
                <Subcategory key={index} data={data} />
              

            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryCard;
