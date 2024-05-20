"use client"
import React from 'react'
import LineChart from './components/linechart'

import Radialchart from './components/radialchart'
import Piechart from './components/piechart'
import Transcation from './components/transcation'

const AdminPage = () => {
  return (
    <>
    <div className='flex flex-col '>
      <div className='grid gap-3 grid-cols-3'>
        <LineChart/>
        <Piechart/>
        <Radialchart/>
      </div>
       <div className='flex flex-col border border-gray-200 rounded-md shadow-md shadow-gray-200 p-4 mt-5'>
        <h1 className='text-3xl font-bold'>Transcations</h1>
        <p className='text-gray-400'>All customer transcations. Upto date !</p>
         <Transcation/>

       </div>
    </div>
    </>
  )
}

export default AdminPage