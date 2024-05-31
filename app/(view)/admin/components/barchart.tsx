"use client";
import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { RevenueChartAPI } from '@/app/services/apis/admin/charts';


const Barchart = () => {
  const [data,setdata]=useState<any>([])
  const [revenuve,setrevenue]=useState("")
  const fetchChartData=async()=>{
    const response=await RevenueChartAPI()
    if(response?.status===200){
      setdata(response?.monthlyRevenue)
      setrevenue(response?.totalRevenue)
    }
  }
 
  const chartRef = useRef(null);
  const options = {
    series: [
      {
        name: "Income",
        color: "#31C48D",
        data:[],
        
      },
      {
        name: "Year",
        color: "#31F48D",
        data:[],
      }
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
        show: false,
      }
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      labels: {
        show: false,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs  mx-1 font-normal  fill-gray-500 dark:fill-gray-400'
        },
        formatter: function(value:any) {
          return "₹" + value
        }
      },
      categories: [],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      },
    },
   
  }
  
  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const updatedOptions = {
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: data.map((item: { month: string }) => item.month),
        },
        series: [
          {
            ...options.series[0],
            data: data.map((item: { total: number }) => item.total),
          },
          {
            ...options.series[1],
            data: data.map((item: { year: number }) => item.year),
          },
         
        ],
      };
      const chart = new ApexCharts(chartRef.current, updatedOptions);
      chart.render();
      return () => {
        chart.destroy();
      };
    }
  }, [data]); 
  
  useEffect(()=>{
    fetchChartData()
  },[])
  
  return (
    <div ><div className="max-w-sm w-full  h-[95%]  shadow-gray-600 bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 md:p-6">
    <div className="flex  justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
      <dl>
        <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
        <dd className="leading-none text-3xl font-bold text-green-900 dark:text-white">₹{revenuve}</dd>
      </dl>
      <div>
        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
          </svg>
          Profit rate 23.5%
        </span>
      </div>
    </div>
  
   
    <div id="bar-chart"  className='overflow-y-hidden' ref={chartRef}></div>
   
  </div></div>
  )
}

export default Barchart

