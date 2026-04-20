import React from 'react';
import banner from '../assets/banners/mid.avif'

export default function SaleSec() {
  return (
    <section className="relative w-full bg-[#0B0B0B] mt-10 py-24 px-6 overflow-hidden">
      {/* Decorative Golden Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4A017] opacity-10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row items-center gap-0">
        
        {/* Left: Content Side (45%) */}
        <div className="w-full md:w-[45%] z-20 order-2 md:order-1 mt-12 md:mt-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-[#D4A017]"></span>
            <span className="text-[#D4A017] uppercase tracking-[0.3em] text-xs font-bold">
              Global Merchant Event
            </span>
          </div>

          <h2 className="text-white text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
            The <span className="text-[#D4A017] italic">Privé</span> <br /> 
            Collective.
          </h2>

          <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10 font-light border-l border-[#D4A017]/30 pl-6">
            Access rare archival pieces and seasonal drops from 40+ world-renowned designers. Authenticity guaranteed, direct from the source.
          </p>

          <div className="flex items-center gap-8">
            <button className="relative group px-10 py-5 bg-[#D4A017] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-500">
              Enter The Sale
              {/* Button Shadow Effect */}
              <div className="absolute -bottom-2 -right-2 w-full h-full border border-[#D4A017] group-hover:bottom-0 group-hover:right-0 transition-all duration-300 -z-10"></div>
            </button>
            <a href="#" className="text-white text-xs font-bold uppercase tracking-widest border-b border-[#D4A017] pb-1 hover:text-[#D4A017] transition-colors">
              View Vendors
            </a>
          </div>
        </div>

        {/* Right: The "Floating" Image Gallery (55%) */}
        <div className="w-full md:w-[55%] relative order-1 md:order-2">
          {/* Main Hero Image with Golden Border */}
          <div className="relative p-4 border border-white/10 rounded-sm shadow-2xl">
            <img 
              src={banner}
              alt="Premium Collection" 
              className="w-full h-[500px] object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
            />
            {/* Gold Overlap Tag */}
            <div className="absolute -bottom-6 -left-6 bg-[#D4A017] p-8 text-black shadow-2xl">
              <p className="text-[10px] font-bold uppercase tracking-tighter mb-1">Curation No.</p>
              <p className="text-4xl font-serif italic leading-none">08—24</p>
            </div>
          </div>

          {/* Secondary "Ghost" Image behind (Desktop Only) */}
          <div className="hidden lg:block absolute -top-12 -right-12 w-48 h-64 border border-[#D4A017]/20 -z-10 bg-[#1A1A1A]">
             <img 
                src={banner}
                className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-500"
             />
          </div>
        </div>

      </div>
    </section>
  );
}