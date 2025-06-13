
import "./globals.css";
import { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from 'react-hot-toast'; 

const urbanist = Urbanist({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Ticket Management",
  description: "A comprehensive ticket management app",
  icons: {
    icon: '/favicon.svg'
  },
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
          <main>{children}</main>
      </body>
    </html>
  );
}
