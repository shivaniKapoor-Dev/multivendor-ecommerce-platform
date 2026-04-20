import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Heart, ChevronLeft, Star } from "lucide-react";
import { deleteWishlist, getWishlist } from "../api/callApi";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishList() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isLoggedIn } = useAuth();
  const { refreshWishlist } = useWishlist();
  const { AddToCart, isItemInCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const res = await getWishlist();
          const items = (res.data?.wishlist || []).filter((item) => item?.product?._id);
          setWishlistItems(items);
        } else {
          const stored = (() => {
            const data = JSON.parse(localStorage.getItem("wishlist"));
            return Array.isArray(data) ? data : [];
          })();

          const formatted = stored.map((item, index) => ({
            _id: index,
            product: item
          }));

          setWishlistItems(formatted.filter((item) => item?.product?._id));
        }
      } catch (error) {
        console.log(error.response?.data);
        setWishlistItems([]);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      if (isLoggedIn) {
        await deleteWishlist(id);
      } else {
        const stored = (() => {
          const data = JSON.parse(localStorage.getItem("wishlist"));
          return Array.isArray(data) ? data : [];
        })();

        const updated = stored.filter(item => item?._id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlist-updated"));
      }

      setWishlistItems(prev =>
        prev.filter(item => item?.product._id !== id)
      );
      refreshWishlist();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleAddToCart = async (product) => {
    if (!product?._id) return;

    await AddToCart(product);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8">
          <Link to="/account" className="flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Back to Account
          </Link>
        </nav>

        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              Your Wishlist <Heart className="text-pink-500 fill-pink-500" size={28} />
            </h1>
            <p className="text-slate-500 mt-1">
              You have {wishlistItems.length} items saved for later.
            </p>
          </div>
        </header>

        {wishlistItems.length > 0 ? (
          <div className="grid gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow"
              >
                <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={`http://localhost:2425/uploads/${item?.product.image}`}
                    alt={item?.product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {item?.product.brand || item?.product.category || "Saved Item"}
                  </span>

                  <h2 className="text-lg font-bold text-slate-800 mt-1">
                    {item?.product.name}
                  </h2>

                  <div className="flex items-center justify-center sm:justify-start mt-2 gap-4">
                    <span className="text-xl font-black text-slate-900">
                      Rs. {item?.product.price?.toFixed(2)}
                    </span>

                    <div className="flex items-center text-yellow-500 text-sm font-medium">
                      <Star size={14} className="fill-yellow-500 mr-1" />
                      {item?.product.rating}
                    </div>
                  </div>

                  <p className={`mt-2 text-xs font-semibold ${item?.product.inStock ? "text-green-600" : "text-orange-500"}`}>
                    {item?.product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleAddToCart(item?.product)}
                    className={`flex-1 sm:w-40 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-colors ${
                      isItemInCart(item?.product?._id)
                        ? "bg-[#CFA969] text-white"
                        : "bg-slate-900 text-white hover:bg-blue-600"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {isItemInCart(item?.product?._id) ? "Added to Cart" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleDelete(item?.product._id)}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Your wishlist is empty
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
