import React from "react";
// Import your brand logos here
import Brand1 from "../assets/brands/1.jpg";
import Brand2 from "../assets/brands/2.jpg";
import Brand3 from "../assets/brands/3.jpg";
import Brand4 from "../assets/brands/4.jpg";
import Brand5 from "../assets/brands/5.jpg";
import Brand6 from "../assets/brands/6.jpg";

export default function TopBrands() {
  const brands = [
    { id: 1, name: "MUSERE", logo: Brand1, discount: "Up to 40% Off" },
    { id: 2, name: "HK MODE", logo: Brand2, discount: "New Season" },
    { id: 3, name: "MISS WEST", logo: Brand3, discount: "Limited Edition" },
    { id: 4, name: "HEY JEWELS", logo: Brand4, discount: "Luxury Collection" },
    { id: 5, name: "ANANIAS", logo: Brand5, discount: "Members Only" },
    { id: 6, name: "BERNODE", logo: Brand6, discount: "Shop Tech" },
  ];

  return (
    <div className="w-full bg-[#f8f8f8] py-16 px-4">
      {/* Editorial Header */}
      <div className="max-w-[1400px] mx-auto mb-10 text-center">
        <span className="text-[#CFA969] text-[10px] font-black uppercase tracking-[0.4em] block mb-2">
          Partnerships
        </span>
        <h2 className="text-3xl md:text-4xl font-light tracking-tighter text-gray-900 uppercase">
          Featured <span className="font-serif italic text-gray-500">Brands</span>
        </h2>
      </div>

      {/* Brand Grid: Rectangular Tiles */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-l border-gray-200">
        {brands.map((brand) => (
          <div 
            key={brand.id} 
            className="group relative bg-white aspect-[4/3] flex flex-col items-center justify-center p-6 border-r border-b border-gray-200 overflow-hidden cursor-pointer"
          >
            {/* Brand Logo */}
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
            />

            {/* Hover Info Panel (Slides up) */}
            <div className="absolute inset-0 bg-[#CFA969]/95 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <p className="text-black font-black uppercase tracking-widest text-[10px] mb-1">
                {brand.name}
              </p>
              <p className="text-white font-medium text-xs">
                {brand.discount}
              </p>
              <div className="mt-3 h-[1px] w-8 bg-black"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges / Footer text */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
          Official Global Retailer • 100% Authentic Products
        </p>
      </div>
    </div>
  );
}