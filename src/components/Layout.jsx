import React from "react";

const Layout = ({children}) => {
  return (
    <div className="border h-screen">
      <div className="grid lg:grid-cols-[.4fr_.6fr] lg:grid-rows-1 grid-rows-[.2fr_.8fr] grid-cols-1 h-full">
        <div className="bg-black text-white text-5xl sm:text-7xl flex justify-center items-center p-8">
          Welcome to the Screen-Recorder
        </div>
        {children}
      </div>
    </div>
  );
};
export default Layout;
