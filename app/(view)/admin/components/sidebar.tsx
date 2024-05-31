"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import logo from "@/public/images/logo.svg";
import Image from "next/image";
import back from "@/public/images/pro.webp";
import auth from "@/app/configs/auth";
import { useRouter } from "next/navigation";
import { UserRoleAPI } from "@/app/services/apis/user";
import UpdateProfile from "./updateProfile";

const Sidebar = () => {
  const cookies = useCookies();
  const router = useRouter();
  const [data, setuerdata] = useState<any>({});
  const [show, setshow] = useState(false);
  const logoutuser = () => {
    setshow(false);
    localStorage.removeItem("toastShownBefore");
    localStorage.removeItem(auth.storageTokenKeyName);
    localStorage.removeItem(auth.storageRole);
    cookies.remove(auth.storageTokenKeyName);
    cookies.remove(auth.storageRole);
    router.replace("/urbancart");
  };
  const getadmin = async () => {
    const response = await UserRoleAPI();
    if (response?.status === 200) {
      setuerdata(response?.userData);
    }
  };
  useEffect(() => {
    getadmin();
  }, []);
  return (
    <>
      <nav className="fixed top-0 z-50 left-0 font-sans w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className=" px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center relative justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <div>
                <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                  <Image
                    src={logo}
                    alt="UrbanCart"
                    className="h-8 me-3 w-fit"
                  />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    UrbanCart
                  </span>
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    onClick={() => setshow(true)}
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    {data?.profileImg === "null" ? (
                      <Image
                        src={back}
                        alt="Loading.."
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <img
                        src={data?.profileImg}
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                    )}
                  </button>
                </div>
                {show && (
                  <div
                    className="z-50  absolute top-6 right-0 shadow-md my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-gray-600 dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="flex justify-between">
                      <div className="px-4 py-3" role="none">
                        {data && (
                          <div>
                            <p
                              className="text-sm text-gray-900 dark:text-white"
                              role="none"
                            >
                              {data?.fullName}
                            </p>
                            <p
                              className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                              role="none"
                            >
                              {data?.email}
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setshow(false)}
                        className="block px-4  absolute right-0 py-2 text-sm text-red-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        x
                      </button>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          href={"/admin"}
                          onClick={() => setshow(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/admin/profile/setting"}
                          onClick={() => setshow(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                   dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Reset Password
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logoutuser}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed font-sans top-0 left-0 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={"/admin"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M3 3v18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M6 15l4-4 4 4 5-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>

                <span className="ms-3">Analytics</span>
              </Link>
            </li>

            <li>
              <Link
                href={"/admin/users"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/products"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/orders"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20v2h-8v-2h2.828l1.571-5.238c.276-.92 1.203-1.762 2.228-1.762h6.764c1.025 0 1.952.842 2.228 1.762l1.571 5.238h2.828v2h-8v-2h-2zm-4-6h14l-1.167-3.888c-.146-.486-.602-.807-1.111-.807h-6.764c-.509 0-.965.32-1.111.807zm7.334-8c1.098 0 1.957.917 1.958 2 .001 1.083-.859 2-1.957 2-1.099 0-1.958-.917-1.958-2s.859-2 1.958-2zm-5.334 0h4c.441 0 .855.287.984.712l1.981 6.288h-9.9l1.981-6.288c.129-.425.543-.712.984-.712zm5.334-2h-4v-2h4v2zm-6.098-2h-1.835l-.842-2.805c-.157-.521-.645-.858-1.185-.858s-1.028.337-1.185.858l-.842 2.805h-1.835v-2h7z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/category"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 3H7c-.55 0-1 .45-1 1s.45 1 1 1h13v14c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1zm-7 12H7c-.55 0-1 .45-1 1s.45 1 1 1h7c.55 0 1-.45 1-1s-.45-1-1-1zm4-5H7c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H7c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/subcategory"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 2h14c1.1 0 1.99.9 1.99 2L21 20c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm3 6h12v2H8V8zm0 4h12v2H8v-2zm0 4h12v2H8v-2z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Subcategory
                </span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href={"/admin/profile"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
