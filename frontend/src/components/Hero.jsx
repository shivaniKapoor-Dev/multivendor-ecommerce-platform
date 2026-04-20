import React, { useEffect, useState } from "react";
import Banner1 from "../assets/banners/banner.jpg";
import Banner2 from "../assets/banners/home2.webp";
import Banner3 from "../assets/banners/home3.png";
import HeroTopTrends from "./HeroTopTrends";

export default function Hero() {
  const banner = [Banner1, Banner2, Banner3];
  const [index, setIndex] = useState(0);

  //  AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banner.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banner.length]);


  return (
  <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 bg-black gap-0">
  
  {/* MAIN BANNER - Takes up 9 columns */}
  <div className="lg:col-span-9 relative group overflow-hidden">
    <div 
      className="flex transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" 
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {banner.map((img, i) => (
        <div key={i} className="min-w-full relative">
          <img src={img} className="w-full h-[500px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h2 className="text-4xl font-bold tracking-tighter uppercase">New Collection 2026</h2>
            <button className="mt-4 bg-white text-black px-8 py-3 font-bold hover:bg-[#CFA969] transition-colors">
              SHOP NOW
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* SIDEBAR TRENDS - Takes up 3 columns */}
  <div className="lg:col-span-3 bg-[#111] p-4 flex flex-col gap-4 border-l border-white/10">
    <h3 className="text-sm font-bold tracking-widest text-[#CFA969] mb-2 uppercase">Trending Now</h3>
    <HeroTopTrends />
  </div>
</div>
  );
}