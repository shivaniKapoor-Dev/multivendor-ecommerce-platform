import React, { useEffect, useState } from 'react';
import { relatedProducts } from '../api/callApi';
import { Link } from 'react-router-dom'; 
import { ShoppingCart, Heart, ArrowRight, Check,Eye, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function RelatedProducts({ category }) {
    const [products, setProducts] = useState([]);
    const [feedbackById, setFeedbackById] = useState({});
    const { AddToCart, isItemInCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await relatedProducts(category);
                setProducts(res.data?.products || []);
            } catch (error) {
                console.log("Fetch error:", error);
            }
        };
        if (category) fetchData();
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

    if (!products.length) return null;

    return (
        <section className="w-full bg-[#FCFCFC] py-16 md:py-24 border-t border-gray-100 mt-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* ELEGANT HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
                    <div className="text-center md:text-left space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Sparkles size={14} className="text-[#CFA969]" />
                            <span className="text-[#CFA969] text-[10px] font-bold uppercase tracking-[0.4em]">
                                Recommendation
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extralight tracking-tighter text-gray-900 uppercase">
                            Complete <span className="font-semibold text-[#CFA969]">The Look</span>
                        </h2>
                        <p className="text-gray-400 text-xs md:text-sm max-w-md font-light">
                            Our stylists suggest these pieces to perfectly complement your current selection.
                        </p>
                    </div>
                    
                    <Link to="/shop" className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-all">
                        View Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* PRODUCT CONTAINER */}
                <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-4 md:gap-8 gap-5">
                    {products.map((item) => (
                        <div key={item._id} className="min-w-[80%] sm:min-w-[45%] md:min-w-0 snap-center group">
                            
                            {/* IMAGE CARD */}
                            <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-white rounded-xl shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                
                                <Link to={`/productDetail/${item._id}`} className="block w-full h-full">
                                    <img 
                                        src={`http://localhost:2425/uploads/${item.image}`} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </Link>

                                {/* FLOATING WISHLIST */}
                                <button
                                
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const result = await toggleWishlist(item);
                                        if (result?.message) {
                                            showFeedback(item._id, result.message);
                                        }
                                    }}
                                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all hover:scale-110 z-10 ${
                                        isWishlisted(item._id) ? "bg-yellow-800 text-white" : "bg-white/80 text-gray-900"
                                    }`}
                                >
                                    <Heart size={16} fill={isWishlisted(item._id) ? "currentColor" : "none"} />
                                </button>
                                {/* 👁 VIEW PRODUCT BUTTON */}


                                {/* DESKTOP QUICK ADD OVERLAY */}
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent hidden md:block">
                                    <button
                                        disabled={!item.inStock}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            const result = await AddToCart(item);
                                            if (result?.message) {
                                                showFeedback(item._id, result.message);
                                            }
                                        }}
                                        className={`w-full py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
                                            ${isItemInCart(item._id) 
                                                ? "bg-[#CFA969] text-white" 
                                                : "bg-white text-black hover:bg-[#CFA969] hover:text-white"
                                            } ${!item.inStock && "opacity-50"}`}
                                    >
                                        {isItemInCart(item._id) ? <><Check size={14}/> Added to Cart</> : "Add to Cart"}
                                    </button>
                                </div>

                                {feedbackById[item._id] && (
                                    <div className="absolute left-4 right-4 bottom-4 rounded-full bg-black/75 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white md:hidden">
                                        {feedbackById[item._id]}
                                    </div>
                                )}
                            </div>

                            {/* TITLE & DETAILS SECTION */}
                            <div className="flex flex-col items-center text-center px-2">
                                <span className="text-[9px] text-[#CFA969] font-black uppercase tracking-[0.2em] mb-1">
                                    {item.brand || "Luvia Original"}
                                </span>
                                
                                <Link to={`/productDetail/${item._id}`}>
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-tight line-clamp-1 mb-1 group-hover:text-[#CFA969] transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                
                                <p className="text-[10px] text-gray-400 font-light italic mb-3">
                                    {item.category} • {item.colour || 'Premium Finish'}
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="text-base font-black text-gray-900">₹{item.price}</span>
                                    <span className="text-xs text-gray-300 line-through font-light">₹{item.price + 999}</span>
                                </div>
                                
                                {/* MOBILE QUICK ADD */}
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const result = await AddToCart(item);
                                        if (result?.message) {
                                            showFeedback(item._id, result.message);
                                        }
                                    }}
                                    className={`md:hidden mt-4 w-full py-3 text-[10px] font-bold rounded-xl border flex items-center justify-center gap-2 transition-all active:scale-95 ${
                                        isItemInCart(item._id) 
                                        ? "bg-[#CFA969] text-white border-[#CFA969]" 
                                        : "bg-black text-white border-black"
                                    }`}
                                >
                                    {isItemInCart(item._id) ? <><Check size={14}/> ADDED TO CART</> : <><ShoppingCart size={14}/> ADD TO CART</>}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
