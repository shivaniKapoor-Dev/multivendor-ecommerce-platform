import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import { logout } from "../api/callApi";
import Loader from "./Loader";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { wishlistCount = 0 } = useWishlist() || {};
  const { cartCount = 0 } = useCart() || {};
  const user = JSON.parse(localStorage.getItem("user"));
  
  const navigate = useNavigate();

  const trimmedQuery = query.trim();

  const handleSearch = () => {
    if (!trimmedQuery) return;
    navigate(`/allProducts?search=${encodeURIComponent(trimmedQuery)}`);
    setIsMenuOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const signoutHandle = async()=>{
    try{
      setLoading(true);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      await logout();
      navigate('/authPage');
    }catch(error){
      console.log(error);
    }
  }

  if(loading){
    return <Loader />;
  }

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        
        {/* MAIN ROW */}
        <div className="flex items-center justify-between h-16 gap-4 lg:gap-8">
          
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-black  text-white  ">
              TheLuvia
            </h1>
          </Link>

          {/* DESKTOP SEARCH BAR */}
          <div className="flex-1 hidden md:flex max-w-2xl relative">
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full bg-white text-sm border text-black border-gray-800 rounded-md py-2.5 pl-4 pr-12 focus:border-white transition-all outline-none placeholder:text-gray-500"
            />
            <button 
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-4 border-l bg-black border border-gray-100 hover:bg-yellow-700 rounded hover:text-black transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* ACTION ICONS */}
          <div className="flex items-center gap-2 sm:gap-6">
{/* return and orders */}


 <div className="hidden lg:flex flex-col items-start mr-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">TheLuvia</span>
              <div className="flex gap-1 text-xs font-semibold">
{       user?(   
       <Link to="/orders" className="hover:underline">Returns <span className="text-gray-700">/</span> Orders</Link>
      ):(
       <Link to="/authPage" className="hover:underline">Returns <span className="text-gray-700">/</span> Orders</Link>

      )
    }                
              </div>
            </div>

            
            {/* AUTH LINKS */}             {/* Account */}

      {   user? (
         <Link to="/account" className="flex items-center gap-2 p-2 hover:bg-gray-900 rounded-full transition group">
              <User size={20} />
              <div className="hidden xl:block leading-none">
                <p className="text-sm uppercase  tracking-tighter">welcome, {user?.name}</p>
                <p className="text-xs font-bold">My Account</p>
              </div>
            </Link>
      ) : (  
            <div className="hidden lg:flex flex-col items-start mr-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Account</span>
              <div className="flex gap-1 text-xs font-semibold">
                <Link to="/authPage" className="hover:underline">Login <span className="text-gray-700">/</span> Register</Link>
                
              </div>
            </div>
            )
            }

            {/* Wishlist */}
            
            <Link to="/wishlist" className="p-2 hover:bg-gray-900 rounded-full transition relative group">
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 bg-white text-black text-[10px] font-bold px-1.5 rounded-full">{wishlistCount}</span>
            </Link>

           

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-gray-900 rounded-full transition relative group">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 bg-white text-black text-[10px] font-bold px-1.5 rounded-full">{cartCount}</span>
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              type="text"
              placeholder="Search products..."
              className="w-full bg-white text-black text-sm rounded-md py-2.5 pl-4 pr-20 outline-none border-none"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-11 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              aria-label="Search products"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-900 p-6 space-y-6 min-h-screen">
          <div className="space-y-4">
{user ? (
  <Link to="/account">My Account</Link>
) : (
  <Link to="/authPage">Login / Register</Link>
)}            <hr className="border-gray-900" />
            <Link to="/orders" className="block text-gray-400 hover:text-white">Track Orders</Link>
            <Link to="/registerVendor" className="block text-gray-400 hover:text-white">Become a Seller</Link>
            <button onClick={signoutHandle} className="block text-gray-400 hover:text-white">Sign Out</button>
            <Link to="/support" className="block text-gray-400 hover:text-white">Customer Support</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
