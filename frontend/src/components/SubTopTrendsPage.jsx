import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { ProductCategory } from "../api/callApi";
import Loader from "./Loader";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function SubTopTrendsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackById, setFeedbackById] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { AddToCart, isItemInCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await ProductCategory(category);
        setProducts(res.data?.products || []);
      } catch (error) {
        console.error("Fetch failed", error?.response?.data);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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

  if (loading) return <Loader />;

  if (products.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">No products found</h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-xs">
          We couldn't find any items in the{" "}
          <span className="font-semibold text-black">"{category}"</span> category right now.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white md:bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold capitalize leading-tight">{category}</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
            {products.length} Items
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* IMAGE */}
              <div
                className="relative overflow-hidden bg-gray-100"
                onClick={() => navigate(`/productDetail/${product._id}`)}
              >
                <img
                  src={`http://localhost:2425/uploads/${product.image}`}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[220px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* LABELS */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.trending && (
                    <span className="bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">
                      Trending
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* WISHLIST */}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const result = await toggleWishlist(product);
                    if (result?.message) {
                      showFeedback(product._id, result.message);
                    }
                  }}
                  className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md text-gray-400 hover:text-red-500 active:scale-90 transition-all"
                >
                  <Heart
                    size={18}
                    className={isWishlisted(product._id) ? "fill-red-500 text-red-500" : ""}
                  />
                </button>

                {feedbackById[product._id] && (
                  <div className="absolute left-2 right-2 bottom-2 rounded-full bg-black/75 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white">
                    {feedbackById[product._id]}
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="p-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 uppercase">
                    {product.brand || "Brand"}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                    {product.name}
                  </p>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    <span className="text-[10px] text-gray-400 line-through">
                      ₹{product.price + 500}
                    </span>
                    <span className="text-[10px] text-green-600 font-bold">
                      (40% OFF)
                    </span>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const result = await AddToCart(product);
                    if (result?.message) {
                      showFeedback(product._id, result.message);
                    }
                  }}
                  className={`w-full mt-2 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-colors active:scale-95 ${
                    isItemInCart(product._id)
                      ? "bg-[#CFA969] text-white"
                      : "bg-gray-900 active:bg-black text-white"
                  }`}
                >
                  <ShoppingCart
                    size={14}
                    className={
                      isItemInCart(product._id)
                        ? "animate-bounce"
                        : ""
                    }
                  />
                  {isItemInCart(product._id) ? "ADDED TO CART" : "ADD TO CART"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
