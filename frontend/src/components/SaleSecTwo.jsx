import React from 'react';
import banner from '../assets/banners/cloth.avif'

export default function SaleSecTwo() {
  return (
    <section className="relative w-full bg-[#FCFAF8] py-24 px-6 overflow-hidden">
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F3F0EC] -skew-x-12 translate-x-20"></div>

      <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center">
        
        {/* Left: The Visual Layer (60%) */}
        <div className="w-full lg:w-3/5 relative group">
          {/* Decorative Gold Frame (Slightly offset) */}
          <div className="absolute -top-4 -left-4 w-full h-full border border-[#D4A017]/30 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          
          {/* Main Horizontal Image */}
          <div className="relative z-10 bg-white p-3 shadow-xl">
            <img 
              src={banner}
              alt="Curated Multivendor Collection" 
              className="w-full h-[450px] object-cover"
            />
            
            {/* Unique "Merchant Stamp" overlay */}
            <div className="absolute -bottom-10 -right-10 bg-white border border-[#D4A017] w-32 h-32 rounded-full flex items-center justify-center p-2 shadow-lg">
               <div className="w-full h-full rounded-full border border-dashed border-[#D4A017]/50 flex items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-[#D4A017] leading-tight tracking-widest uppercase">
                    Verified <br /> Originals
                  </span>
               </div>
            </div>
          </div>
        </div>

        {/* Right: The Typography Layer (40%) */}
        <div className="w-full lg:w-2/5 mt-20 lg:mt-0 lg:pl-20 z-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[#D4A017] font-bold tracking-[.3em] text-xs uppercase">Premium Access</span>
              <div className="h-[1px] flex-grow bg-[#D4A017]/20"></div>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-[#2D2926] leading-[1.1]">
              The <br />
              <span className="text-[#D4A017] italic underline decoration-[1px] underline-offset-[12px]">Artisanal</span> <br />
              Series.
            </h2>

            <p className="text-[#6B6661] text-lg font-light leading-relaxed max-w-sm">
              A curated synergy of 12 independent labels. Discover high-craft pieces at values exclusive to our collective members.
            </p>

            <div className="pt-6">
              <button className="group relative overflow-hidden bg-[#2D2926] text-[#FCFAF8] px-12 py-5 text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#D4A017] hover:text-[#2D2926]">
                Explore The Drop
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#2D2926] mt-1"></span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Unique Floating Text Component */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
        <p className="text-[#D4A017] font-serif italic text-6xl">Est. 2026</p>
      </div>
    </section>
  );
}