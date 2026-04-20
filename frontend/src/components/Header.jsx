import React from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import Hero from "./Hero";

export default function Header() {
  return (
    <>
     <div className="bg-[#CFA969] px-2 py-3 sticky top-0 z-50 shadow-2xl">
  <h1 className="text-xs md:text-sm text-center font-black tracking-[0.5em] text-black uppercase">
    Free Shipping • 14 Day Returns • TheLuvia Exclusive
  </h1>
</div>

     
      <div className="w-full"> 
        <Navbar />
        <Navbar2 />

      </div>
    </>
  );
}
