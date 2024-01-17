import React from "react";
import Navbar from "../navigation/navbar";
import Footer from "../navigation/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full  bg-gray-50 max-w-screen-2xl mx-auto flex  flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
