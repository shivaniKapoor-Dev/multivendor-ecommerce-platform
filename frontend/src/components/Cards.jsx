import React from 'react';
import image1 from '../assets/card/5.jpg';
import image2 from '../assets/card/20.jpg';
import image3 from '../assets/card/7.png';
import image4 from '../assets/card/9.png';
import image5 from '../assets/card/makeup.webp';
import image6 from '../assets/card/skin.jpg';
import image7 from '../assets/card/haircare.avif';
import image8 from '../assets/card/perfume.webp';
import image9 from '../assets/card/beautytools.webp';
import image10 from '../assets/card/lipcaree.avif';
import image11 from '../assets/card/dress.avif';
import image12 from '../assets/card/ethnic.jpg';
import image13 from '../assets/card/acessories.jpg';
import image14 from '../assets/card/west.webp';
import image15 from '../assets/card/bags.webp';
import image16 from '../assets/card/partywear.jpg';

import { useNavigate } from 'react-router-dom';

export default function Cards() {
  const navigate = useNavigate();

  const cardData = [
    { title: 'Skincare', category: 'beauty', img: image6 },
    { title: 'Makeup', category: 'makeup', img: image5 },
    { title: 'Hair Care', category: 'haircare', img: image7 },
    { title: 'Fragrances', category: 'perfume', img: image8 },
    { title: 'Beauty Tools', category: 'beauty tools', img: image9 },
    { title: 'Lip Care', category: 'lipcare', img: image10 },
    { title: 'Dresses', category: 'fashion', img: image11 },
    { title: 'Ethnic Wear', category: 'ethnic', img: image12 },
    { title: 'Party Wear', category: 'party', img: image16 },
    { title: 'Accessories', category: 'accessories', img: image13 },
    { title: 'Western Wear', category: 'western', img: image14 },
    { title: 'Branded Bags', category: 'handbags', img: image15 },
  ];

  return (
    <div className="w-full bg-white py-10">
      <div className="max-w-[1400px] mx-auto px-6 mb-6">
        <h2 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900 uppercase">
          Shop Beauty & Fashion
        </h2>
        <div className="h-1 w-12 bg-[#CFA969] mt-1"></div>
      </div>

      <div
        className="
          flex
          overflow-x-auto
          hide-scrollbar
          lg:flex-wrap
          lg:justify-center
          gap-6
          px-6
          pb-4
        "
      >
        {cardData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer transition-all min-w-[100px] sm:min-w-[120px]"
          >
            <div
              className="
                relative
                h-[100px] w-[100px]
                sm:h-[130px] sm:w-[130px]
                rounded-full
                p-1
                border-2 border-transparent
                group-hover:border-[#CFA969]
                transition-all duration-500
              "
            >
              <div
                onClick={() => navigate(`/products/?category=${item.category}`)}
                className="w-full h-full rounded-full overflow-hidden bg-gray-50 shadow-inner"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 rounded-full group-hover:animate-ping bg-[#CFA969]/10 -z-10"></div>
            </div>

            <p
              className="
                mt-4
                text-[11px] sm:text-xs md:text-sm
                font-bold
                uppercase
                tracking-widest
                text-gray-900
                group-hover:text-black
                transition-colors
                text-center
              "
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
