import React, { useEffect, useRef, useState } from "react";
import { Grid, List, ShoppingCart, Eye, Heart, SearchX } from "lucide-react";
import { Products, searchBar } from "../api/callApi";
import { UPLOADS_BASE_URL } from "../api/AxiosApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ShowingAllProducts() {
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [feedbackById, setFeedbackById] = useState({});
  const requestIdRef = useRef(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { AddToCart, isItemInCart } = useCart();

  const query = new URLSearchParams(location.search).get('search')?.trim() || "";

  const fetchData = async () => {
    const requestId = ++requestIdRef.current;
    try {
      setLoading(true);
      const res = query ? await searchBar(query) : await Products();

      if (requestId !== requestIdRef.current) return;

      setProducts(res.data?.products || []);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      console.error("Fetch failed", error);
      setProducts([]);
    } finally {
      if (requestId !== requestIdRef.current) return;
      setLoading(false);
      setHasLoadedOnce(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    setVisibleCount(10);
  }, [query]);

  const showFeedback = (productId, message) => {
    setFeedbackById(prev => ({
      ...prev,
      [productId]: message
    }));

    window.setTimeout(() => {
      setFeedbackById(prev => {
        if (!prev[productId] || prev[productId] !== message) return prev;

        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }, 1800);
  };

  return (
    <div className="w-full bg-[#fdfdfd] min-h-screen">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <span className="text-[#CFA969] text-[10px] font-black uppercase tracking-[0.4em] block mb-1">
              Luxury Collection
            </span>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-gray-900 uppercase">
              {query ? `Results: ${query}` : "All Products"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-[11px] text-gray-400 font-medium uppercase hidden sm:block">
              Showing {Math.min(visibleCount, products.length)} of {products.length} Items
            </p>
            <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-full shadow-inner">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${viewMode === "grid" ? "bg-white shadow-md text-[#CFA969]" : "text-gray-400"}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${viewMode === "list" ? "bg-white shadow-md text-[#CFA969]" : "text-gray-400"}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {loading && !hasLoadedOnce ? (
          <Loader />
        ) : null}

        {products.length > 0 ? (
          <div className="relative">
            {loading && hasLoadedOnce && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px] rounded-2xl">
                <Loader />
              </div>
            )}

            <div className={
              viewMode === "grid" 
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6" 
              : "flex flex-col gap-4 max-w-3xl mx-auto"
            }>
            {products.slice(0, visibleCount).map((product) => (
              <div 
                key={product._id}
                className={`group bg-white border border-gray-100 transition-all duration-500 hover:border-[#CFA969]/30 hover:shadow-xl relative ${
                  viewMode === "grid" ? "flex flex-col rounded-xl" : "flex flex-row h-40 md:h-52 rounded-2xl"
                }`}
              >
                {/* IMAGE AREA */}
                <div className={`relative overflow-hidden bg-gray-50 ${
                  viewMode === "grid" ? "w-full aspect-[4/5] rounded-t-xl" : "w-1/3 h-full rounded-l-2xl"
                }`}>
                  <img 
                    src={`${UPLOADS_BASE_URL}/${product.image}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={product.name}
                  />
                  
                  {/* FLOATING ACTION BUTTONS (Desktop Hover, Mobile Partial) */}
                  <div className="absolute top-3 right-3 flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 md:flex hidden">
                    <button 
                      onClick={async () => {
                        const result = await toggleWishlist(product);
                        if (result?.message) {
                          showFeedback(product._id, result.message);
                        }
                      }}
                      className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <Heart size={16} className={isWishlisted(product._id) ? "fill-red-500 text-red-500" : "text-gray-600"}/>
                    </button>
                    <button 
                      onClick={() => navigate(`/productDetail/${product._id}`)}
                      className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-[#CFA969] hover:text-white transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* MOBILE QUICK-ACTION OVERLAY */}
                  <div className="absolute bottom-2 right-2 md:hidden">
                    <button 
                       onClick={async (e) => {
                         e.stopPropagation();
                         const result = await toggleWishlist(product);
                         if (result?.message) {
                           showFeedback(product._id, result.message);
                         }
                       }}
                       className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md"
                    >
                       <Heart size={14} className={isWishlisted(product._id) ? "fill-red-500 text-red-500" : "text-gray-400"}/>
                    </button>
                  </div>

                  {feedbackById[product._id] && (
                    <div className="absolute left-2 right-2 bottom-2 rounded-full bg-black/75 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white">
                      {feedbackById[product._id]}
                    </div>
                  )}
                </div>

                {/* INFO AREA */}
                <div className={`p-4 flex flex-col justify-between flex-grow ${viewMode === "list" ? "md:p-8" : ""}`}>
                  <div onClick={() => navigate(`/productDetail/${product._id}`)} className="cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-[#CFA969] uppercase tracking-widest">{product.colour || "Standard"}</span>
                      {!product.inStock && <span className="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase">Sold Out</span>}
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 group-hover:text-[#CFA969] transition-colors line-clamp-2 leading-snug mb-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                      <span className="text-[11px] text-gray-400 line-through">₹{product.price + 500}</span>
                    </div>
                    
                    <button
                      onClick={async () => {
                        const result = await AddToCart(product);
                        if (result?.message) {
                          showFeedback(product._id, result.message);
                        }
                      }}
                      disabled={!product.inStock}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 ${
                        isItemInCart(product._id) 
                        ? "bg-[#CFA969] text-white" 
                        : "bg-black text-white hover:bg-gray-800"
                      } disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
                    >
                      <ShoppingCart size={14} className={isItemInCart(product._id) ? "animate-bounce" : ""} />
                      {isItemInCart(product._id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="bg-gray-50 p-8 rounded-full mb-6">
               <SearchX size={64} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-light text-gray-900 uppercase tracking-widest">No products found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">We couldn't find what you're looking for. Try a different search term or browse our categories.</p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-8 px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#CFA969] transition-all"
            >
              Explore Shop
            </button>
          </div>
        )}

        {/* PAGINATION BUTTONS */}
        {products.length > 0 && (
          <div className="flex justify-center mt-16 gap-4">
            {visibleCount < products.length ? (
              <button
                className="group flex items-center gap-3 bg-white border border-black px-8 py-3 rounded-full text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
                onClick={() => setVisibleCount(prev => prev + 10)}
              >
                Load More Items
              </button>
            ) : products.length > 10 && (
              <button
                className="flex items-center gap-3 bg-gray-100 px-8 py-3 rounded-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                onClick={() => setVisibleCount(10)}
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
