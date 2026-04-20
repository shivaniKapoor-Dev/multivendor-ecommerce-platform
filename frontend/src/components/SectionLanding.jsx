import React from 'react';
import banner from '../assets/banners/model.jpg'

export default function SectionLanding() {
  return (
    <section className="relative w-full bg-[#FAF9F6] py-24 px-6 md:px-12 overflow-hidden">
      
      {/* Unique Design Element: Vertical Thin Gold Lines */}
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
        <div className="w-[1px] h-full bg-[#D4A017]"></div>
        <div className="w-[1px] h-full bg-[#D4A017]"></div>
        <div className="w-[1px] h-full bg-[#D4A017]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* The "Broken Grid" Image Composition */}
        <div className="relative w-full mb-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          
          {/* Main Horizontal Image (The 'Anchor') */}
          <div className="relative w-full md:w-3/4 z-10">
            <img 
              src= {banner}
              alt="Main Collection" 
              className="w-full h-[400px] md:h-[500px] object-cover shadow-2xl"
            />
          </div>

          {/* Secondary Vertical Image (The 'Overlap') */}
          <div className="relative md:absolute md:-bottom-12 md:-left-12 w-64 h-80 z-20 hidden md:block border-[12px] border-[#FAF9F6] shadow-xl overflow-hidden group">
            <img 
              src={banner}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Vendor Detail"
            />
          </div>
        </div>

        {/* The Floating Content Box */}
        <div className="relative z-30 -mt-32 md:-mt-48 bg-white p-8 md:p-16 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-t-4 border-[#D4A017] max-w-2xl">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4A017] mb-4 block">
            The Multi-Vendor Series
          </span>
          
          <h2 className="text-4xl md:text-6xl font-light text-[#1A1A1A] mb-6 leading-none">
            Selected <span className="font-serif italic">Masterpieces</span>
          </h2>

          <p className="text-gray-500 text-sm md:text-base mb-10 leading-relaxed font-light italic">
            "A global assembly of craftsmanship, curated for the modern collector."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="w-full md:w-auto px-12 py-4 bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4A017] transition-all duration-300">
              Explore The Sale
            </button>
            <span className="hidden md:block h-8 w-[1px] bg-gray-200"></span>
            <div className="text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Up to</p>
              <p className="text-2xl font-serif text-[#D4A017]">45% Off</p>
            </div>
          </div>
        </div>

      </div>

      {/* Background Floating Number (Unique Brand Mark) */}
      <div className="absolute top-10 right-10 text-[120px] font-serif italic text-[#D4A017]/5 select-none">
        26
      </div>
    </section>
  );
}
