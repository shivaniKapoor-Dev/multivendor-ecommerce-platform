import { Box, LayoutDashboard, ListOrdered, Settings, Store, Wallet, X } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { vendorDashboard } from "../api/callApi";
import { useState } from "react";

export default function VendorSidebar({ isOpen, setIsOpen }) {
  const [vendor, setVendor] = useState([]);
  const menu = [
    { name: "Dashboard", path: "/vendorDashboard", icon: <LayoutDashboard size={18}/> },
    { name: "Orders", path: "/vendor/orders", icon: <ListOrdered size={18}/> },
    { name: "Products", path: "/vendor/products", icon: <Box size={18}/> },
    { name: "Store Profile", path: "/vendor/storeProfile", icon: <Store size={18}/> },
    { name: "Payments", path: "/vendor/payments", icon: <Wallet size={18}/> },
    { name: "Settings", path: "/vendor/settings", icon: <Settings size={18}/> },
  ];

useEffect(()=>{
  const fetchData = async()=>{

  try{
const res = await vendorDashboard();
setVendor(res.data.user || []);
}
catch(error){
  console.log(error.response?.data);
}}
fetchData();
}, [])

  return (
    <>
  { vendor.isVerified && (
   <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-opacity
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 flex-shrink-0
          bg-white text-black
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-lg font-semibold">Vendor Portal</h2>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={22}/>
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                ${isActive
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
)} 
</>
);
}
