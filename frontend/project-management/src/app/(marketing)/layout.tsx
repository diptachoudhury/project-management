'use client';
import "../globals.css";
import Footer from "../../components/marketing/Footer";
import TopNav from "../../components/marketing/TopNav";


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <div className="flex flex-col min-h-screen">
          <TopNav/>
          <div >{children}</div>
          <Footer />
        </div>
  );
}
