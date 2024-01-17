import React from "react";

const Navbar = () => {
  return (
    <div className="h-12 w-full flex bg-gray-950 items-center">
      <h1 className="font-bold text-2xl p-2 pl-6 text-white select-none">
        ToDo<span className="text-indigo-400">I</span>
      </h1>
    </div>
  );
};

export default Navbar;
