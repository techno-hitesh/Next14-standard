"use client"
import React, { useEffect } from 'react';
import Radialchart from './components/radialchart';
import Piechart from './components/piechart';
import Barchart from './components/barchart';
import Transcation from './components/transcation';

const AdminPage = () => {

  return (
    <>
      <div className='flex flex-col '>
        <div className='grid gap-3 grid-cols-3'>
          <Barchart />
          <Piechart />
          <Radialchart />
        </div>
        <div className='flex flex-col border border-gray-200 rounded-md shadow-md shadow-gray-200 p-4 mt-5'>
          <Transcation />
        </div>
      </div>
    </>
  );
}

export default AdminPage;