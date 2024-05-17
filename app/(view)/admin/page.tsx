"use client"
import React, { useState } from 'react'
import Sidebar from './components/sidebar'
import Carousel from './components/carousel'
import Service from './components/service'
import About from './components/about'

const AdminPage = () => {
  const [search,setsearch]=useState("")
  return (
    <>
     <Carousel/>
     <Service/>
     <About/>
    </>
  )
}

export default AdminPage