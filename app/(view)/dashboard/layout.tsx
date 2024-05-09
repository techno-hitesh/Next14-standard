export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  return (

        <div className="lg:container w-screen mx-auto"> 
          {children}
        </div>
    );
  }
  