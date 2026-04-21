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
  <section className="mx-auto max-w-[1600px] overflow-hidden bg-black text-white">
  <div className="grid grid-cols-1 lg:grid-cols-12">
  
  {/* MAIN BANNER - Takes up 9 columns */}
  <div className="relative overflow-hidden lg:col-span-9">
    <div 
      className="flex transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" 
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {banner.map((img, i) => (
        <div key={i} className="min-w-full relative">
          <img
            src={img}
            alt={`New Collection slide ${i + 1}`}
            className="h-[300px] w-full object-cover sm:h-[380px] md:h-[460px] lg:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10">
            <div className="max-w-[320px] sm:max-w-[420px] md:max-w-[520px]">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#CFA969] sm:text-xs">
              New Season Drop
            </p>
            <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
              New Collection 2026
            </h2>
            <p className="mt-2 text-xs text-white/80 sm:mt-3 sm:text-sm md:text-base">
              Fresh silhouettes, statement looks, and elevated everyday picks curated for mobile-first browsing.
            </p>
            <button className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-3 text-xs font-bold tracking-[0.2em] text-black transition-colors hover:bg-[#CFA969] sm:mt-6 sm:px-8 sm:text-sm">
              SHOP NOW
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="absolute bottom-4 right-4 flex gap-2 sm:bottom-6 sm:right-6">
      {banner.map((_, dotIndex) => (
        <button
          key={dotIndex}
          type="button"
          aria-label={`Go to slide ${dotIndex + 1}`}
          onClick={() => setIndex(dotIndex)}
          className={`h-2.5 rounded-full transition-all ${
            index === dotIndex ? "w-7 bg-[#CFA969]" : "w-2.5 bg-white/55"
          }`}
        />
      ))}
    </div>
  </div>

  {/* SIDEBAR TRENDS - Takes up 3 columns */}
  <div className="border-t border-white/10 bg-[#111] p-4 sm:p-5 lg:col-span-3 lg:border-l lg:border-t-0">
    <div className="mb-3 flex items-center justify-between">
    <h3 className="text-xs font-bold uppercase tracking-[0.35em] text-[#CFA969] sm:text-sm">Trending Now</h3>
    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs">Top Picks</span>
    </div>
    <HeroTopTrends />
  </div>
</div>
</section>
  );
}
