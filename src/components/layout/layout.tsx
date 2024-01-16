import React from "react";
import Navbar from "../navigation/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-slate-50 max-w-screen-2xl mx-auto flex items-start flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
