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
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 p-1">
      {trends.map((value) => (
        <div key={value.id} className="relative group cursor-pointer overflow-hidden rounded-xl shadow-sm border border-gray-100">
          <img 
            src={value.image} 
            className="w-full h-[90px] lg:h-[110px] object-cover group-hover:scale-110 transition-transform duration-700" 
            alt={value.title}
          />
          {/* Subtle gradient overlay instead of solid black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
          
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <p className="bg-white/80 backdrop-blur-md text-[#CFA969] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              {value.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}