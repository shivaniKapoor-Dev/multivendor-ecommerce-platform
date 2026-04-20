import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar2() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeCategory = queryParams.get("category");

  const navItems = [
    { label: "Home", to: "/", isActive: location.pathname === "/" },
    {
      label: "Beauty",
      to: "/products?category=beauty",
      isActive: activeCategory === "beauty",
    },
    {
      label: "Fashion",
      to: "/products?category=fashion",
      isActive: activeCategory === "fashion",
    },
    {
      label: "Men",
      to: "/products?category=men",
      isActive: activeCategory === "men",
    },
    {
      label: "Women",
      to: "/products?category=women",
      isActive: activeCategory === "women",
    },
    {
      label: "Clothes",
      to: "/products?category=clothing",
      isActive: activeCategory === "clothes",
    },
    {
      label: "Accessories",
      to: "/products?category=accessories",
      isActive: activeCategory === "accessories",
    },
    {
      label: "Customer Service",
      to: "/customer-care",
      isActive: location.pathname === "/customer-care",
    },
    {
      label: "Contact Us",
      to: "/contact",
      isActive: location.pathname === "/contact",
    },
    {
      label: "About Us",
      to: "/about",
      isActive: location.pathname === "/about",
    },
  ];

  return (
    <>
      <div className="border-b border-gray-800 shadow-sm">
        <nav className="bg-black text-white">
          <div className="max-w-[1400px] mx-auto lg:ml-40 flex items-center">
            <div
              className="
                flex
                gap-6
                overflow-x-auto
                scrollbar-hide
                px-3
                py-3
                text-sm
                sm:text-base
                whitespace-nowrap
                items-center
              "
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`transition ${
                    item.isActive
                      ? "text-[#CFA969] font-semibold"
                      : "hover:text-[#CFA969]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
