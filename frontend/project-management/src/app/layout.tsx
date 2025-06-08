import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import { Providers } from "@/stores/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({subsets: ['latin']});


export const metadata: Metadata = {
  title: "Task Management App",
  description: "A modern task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={inter.className}>
      <Providers>  
        {children}
        <Toaster position="top-right"/>
      </Providers>
      </body>
    </html>
  );
}
