import Navbar from "../dashboard/components/navbar";
import Sidebar from "./components/sidebar";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

   
  return (
        <>

        <div className="lg:container w-screen mx-auto"> 
        <Navbar />
        {/* <Sidebar/> */}
          {children}
        </div>
        </>
    );
  }
  