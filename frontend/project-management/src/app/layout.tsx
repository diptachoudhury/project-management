import "./globals.css";
import Footer from "../components/marketing/Footer";
import { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from 'react-hot-toast'; 
import TopNav from "../components/marketing/TopNav";
import Sidebar from "../components/marketing/SideBar";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Ticket Management",
  description: "A comprehensive ticket management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
          <Toaster
              position="top-right"
              reverseOrder={false} 
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#16a34a', 
                    color: '#fff',
                  },
                },
                error: {
                  style: {
                    background: '#dc2626',
                    color: '#fff',
                  },
                },
              }}
            />
        <div className="flex flex-col min-h-screen">
          <TopNav/>
          <div className="flex">
            {/* <Sidebar/> */}
          <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
