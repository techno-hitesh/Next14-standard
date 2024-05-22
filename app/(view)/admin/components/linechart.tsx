import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'
import NumberCounter from './counter'

const LineChart = () => {



  return (
    <div>
    <div className="max-w-sm w-full h-[100%] bg-white rounded-lg shadow-md shadow-gray-600 dark:bg-gray-800 p-4 md:p-6">
       <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Customers :</h1>
          <hr  className='bg-gray-100 my-2'/>
          <div className='flex justify-around mt-10 items-center'>
            <div className='text-6xl font-bold'><NumberCounter  targetNumber={100}/></div>
            <p className='text-6xl'>👥</p>
          </div>
          <hr className='bg-gray-100 my-4'/>
       </div>
    </div>
    </div>
  )
}

export default LineChart