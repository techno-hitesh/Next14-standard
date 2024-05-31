"use client";
import React, {useRef,useEffect, useState } from 'react'
import ApexCharts from 'apexcharts'
import { AllPaymentsAdminApi } from '@/app/services/apis/admin/charts'

const Piechart =() => {
  const [total,settotal]=useState("")
  const [pending,setpending]=useState("")
  const [sucess,setsucess]=useState("")
  const [products,setproducts]=useState("")
  const fetchdata=async()=>{
    const response=await AllPaymentsAdminApi()
  if(response?.status===200){
    settotal(response?.totalPaymentCount)
    setsucess(response?.successPaymentCount)
    setpending(response?.pendingPaymentCount)
    setproducts(response?.totalByproductCount)
  }
  }
  const chartRef = useRef(null);

  const  getChartOptions = () => {
    return {
      series: [pending,sucess,products],
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Pending", "Successfull", "Products"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value:any) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value:any) {
            return value  + "%"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    }
  }

  useEffect(()=>{
    fetchdata()
  },[])
  useEffect(() => {
    if (chartRef.current) {
        const chart = new ApexCharts(chartRef.current, getChartOptions());
        chart.render();

        return () => {
            chart.destroy();
        };
    }
},  [pending, sucess, products]);

  
  return (
    <div>
    <div className="max-w-sm w-full h-[95%]  shadow-md shadow-gray-600 bg-white rounded-lg  dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
          <div className="flex-col items-center">
            <div className="flex items-center mb-1">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Transcations</h5>
                <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                </svg>
          </div>
          <div className='flex items-center'>
            <p className='text-gray-400 mr-2'>Total Transcations:</p>
            <p className="leading-none text-3xl font-bold text-purple-900 dark:text-white">{total}</p>
          </div>
        </div>
      </div>
    
      <div className="py-6"  ref={chartRef}  id="pie-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <p className='text-xs ml-4 mt-5 text-gray-600'>Explore the proportion of pending and successful payments compared to the total transactions, providing valuable financial context.</p>  
      </div>
    </div>
    </div>
  )
}

export default Piechart