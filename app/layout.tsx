import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style/globals.css";
import { CookiesProvider } from 'next-client-cookies/server';
import ReduxProvider from "./store/reduxProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

return (
    <ReduxProvider>
    <CookiesProvider>
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
       <div className="w-screen "> 
        {children}
        </div>
      </body>
    </html>
    </CookiesProvider>
    </ReduxProvider>
  );
}
