import react, { useState } from 'react';
import { getPdfById } from '@/app/services/apis/payment';
import "../../style/style.css"


const FileDownloader = (data:any) => {

    const {id} = data.data;

    const [loading ,setLoading] = useState(false)

  const downloadPDF = async () => {
        setLoading(true)
        const data = await getPdfById(id);
        
        if(data.success == true){
          setLoading(false)
          window.open(data.pdfUrl, '_blank');
        }
  }

  return (

    <>
    {/* {pdfUrl && pdfUrl !="" ? 
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" ><button>Download CV</button></a>
    :""} */}

      <button className='custom-button-primary mt-10' onClick={downloadPDF}> Download Invoice {loading==true ?"Loading....":""} </button>
        
       
    </>
  );
}

export default FileDownloader;
