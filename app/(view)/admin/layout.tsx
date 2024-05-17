import Navbar from "../dashboard/components/navbar";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

   
  return (
        <>

        <div className="lg:container w-screen mx-auto"> 
        <Navbar/>
          {children}
        </div>
        </>
    );
  }
  