import React from "react";
import Beauty from "../assets/promoTrends/mak.webp";
import FemaleModel from "../assets/promoTrends/pa.webp";
import MaleModel from "../assets/promoTrends/we.avif";
import cleanmakeup from "../assets/promoTrends/cleanmakeup.jpg";
import haircare from "../assets/promoTrends/haircare.webp";
import Jewellery from "../assets/promoTrends/ew.jpg";
import perfume from "../assets/promoTrends/perfume.png";
import street from "../assets/promoTrends/street.jpg";
import ethnic from "../assets/promoTrends/ethnic.webp";
import { useNavigate } from "react-router-dom";

export default function TopTrends() {
  const trends = [
    { id: 1, title: "Glow Skincare", image: Beauty, tag: "Best Seller", category: "makeup" },
    { id: 2, title: "Clean Makeup", image: cleanmakeup, tag: "Trending", category: "beauty" },
    { id: 3, title: "Hair Care", image: haircare, tag: "Editor Pick", category: "haircare" },
    { id: 4, title: "Fragrance Picks", image: perfume, tag: "New Drop", category: "perfume" },
    { id: 5, title: "Party Dresses", image: FemaleModel, tag: "Hot Style", category: "party" },
    { id: 6, title: "Ethnic Looks", image: ethnic, tag: "Festive", category: "ethnic" },
    { id: 7, title: "Street Fashion", image: street, tag: "Top Rated", category: "fashion" },
    { id: 8, title: "Statement Accessories", image: Jewellery, tag: "Luxury", category: "accessories" },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-[1400px] mx-auto mb-8">
        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-gray-900 border-l-4 border-[#CFA969] pl-4">
          Beauty & Fashion Trends
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {trends.map((item) => (
          <div
            onClick={() => navigate(`/trends?category=${item.category}`)}
            key={item.id}
            className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#CFA969] mb-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {item.tag}
              </span>
              <h3 className="text-white text-sm md:text-base font-bold uppercase tracking-wider">
                {item.title}
              </h3>

              <div className="h-[2px] w-0 bg-white mt-2 group-hover:w-full transition-all duration-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
