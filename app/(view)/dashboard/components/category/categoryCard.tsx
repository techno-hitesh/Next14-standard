"use client";
import React, { useEffect, useState } from "react";
import { getAllCategoryAPI } from "@/app/services/apis/user/categories";
import { dashboardLinks } from "@/app/configs/authLinks";
import Link from "next/link";
import Carousel from "../carousel";
import { Getallsubcategory } from "@/app/services/apis/admin/products";
import Subcategory from "../subcategory";

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
      <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Our featured Aroma Range
            </h2>
            <p className="mt-4 text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              faucibus massa dignissim tempus.
            </p>
          </div>
          <div className="my-4">
            <Carousel />
          </div>
          <hr />
          <div className="overflow-auto flex mt-20  mb-16 flex-col">
            <h1 className="my-2 text-3xl font-bold  text-gray-700">
              Shop by Category{" "}
            </h1>
            <div className="mb-5 flex w-[120%] h-[90%]  gap-7 ">
              {catData?.length > 0 &&
                catData.map((catValue: any, i: any) => (
                  <article key={i} className="relative  mt-4 w-40">
                    <Link
                      href={dashboardLinks?.subcategoryLinks + catValue._id}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                          src={catValue.categoryImg}
                          alt=""
                        />
                      </div>
                    </Link>
                    <div className="mt-4 flex items-start justify-between">
                      <div className="">
                        <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                          {catValue.categoryName}
                          <span className="absolute" aria-hidden="true"></span>
                        </h3>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
          {/* <hr /> */}
          {sub.map((data: any, index: any) => (
            <div className=" flex mt-10  flex-col">
              {/* <h1 className="my-2 text-3xl font-bold  text-gray-700">{data?.subCategoryName}</h1> */}
              <div key={index}>
                <Subcategory key={index} data={data} />
              </div>

            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryCard;
