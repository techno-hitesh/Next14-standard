
import Sidebar from "./components/sidebar";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

   
  return (
        <>

        <div className="lg:container font-sans relative w-screen mx-auto"> 
        <Sidebar/>
        <div className="p-4 absolute  top-16 sm:ml-64">
          {children}
        </div>
        </div>
        </>
    );
  }
  