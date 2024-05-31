"use client"
import Navbar from "./_components/navbar";
import React from "react";
import Footer from "../_components/footer";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {


   
  return (
        <>

        <React.Suspense fallback={<>...</>}>
          <div className="lg:container w-screen mx-auto"> 
          <Navbar />
            {children}
            <Footer/>
          </div>
        </React.Suspense>
        </>
    );
  }
  