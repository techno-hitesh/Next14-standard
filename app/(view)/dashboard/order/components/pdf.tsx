import react from 'react';
import axios from 'axios';
import { getPdfById } from '@/app/services/apis/payment';
import Link from 'next/link';

const FileDownloader = (data:any) => {
    console.log("data",data.data.id)
    const {id} = data.data;

  const downloadPDF = async () => {
        const data = await getPdfById(id);
        console.log("update=----",data)  
  }

  return (

    <>
    {/* <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noopener noreferrer" ><button>Download CV</button></a> */}
        <button onClick={downloadPDF}> Download PDF </button>
        </>

  );
}

export default FileDownloader;