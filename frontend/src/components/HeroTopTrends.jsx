import React from "react";
import Beauty from "../assets/promoTrends/beautyProducts.webp";
import MaleModel from "../assets/promoTrends/manModel.jpg";
import FemaleModel from "../assets/promoTrends/femaleModel.jpg";
import Jewellery from "../assets/promoTrends/jewellery.jpg";

export default function HeroTopTrends() {
  const trends = [
    { id: 1, title: "#Beauty", image: Beauty },
    { id: 2, title: "#Western", image: FemaleModel },
    { id: 3, title: "#Party wear", image: MaleModel },
    { id: 4, title: "#Modern Jewellery", image: Jewellery },
  
  ];

 return (
    <div className="grid grid-cols-2 gap-3 p-1 sm:gap-4 lg:grid-cols-1">
      {trends.map((value) => (
        <div key={value.id} className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-sm">
          <img 
            src={value.image} 
            className="h-[110px] w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-[130px] lg:h-[108px]" 
            alt={value.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          <div className="absolute inset-x-0 bottom-3 flex justify-center px-2">
            <p className="rounded-full bg-white/85 px-3 py-1 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#CFA969] shadow-sm backdrop-blur-md sm:text-[10px]">
              {value.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
