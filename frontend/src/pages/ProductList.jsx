import React, { useState, useEffect } from "react";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { ProductCategory, Products } from "../api/callApi";
import { API_BASE_URL, UPLOADS_BASE_URL } from "../api/AxiosApi";
import { useLocation, useNavigate } from "react-router-dom";
import SideFilter from "./SideFilter";
import Loader from "../components/Loader";
import { Filter } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackById, setFeedbackById] = useState({});

  const [filters, setFilters] = useState({
    colour: [],
    size: [],
    inStock: false
  });

  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { AddToCart, isItemInCart } = useCart();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const res = category
          ? await ProductCategory(category, filters)
          : await Products();
        setProducts(res.data?.products || []);
      } catch (error) {
        const message =
          error.code === "ERR_NETWORK"
            ? `Cannot connect to the backend server at ${API_BASE_URL}. Check that the backend is running and that VITE_API_URL is correct.`
            : error.response?.data?.message || "Unable to load products right now.";

        console.error("Fetch products failed:", error.message);
        setErrorMessage(message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category,  JSON.stringify(filters)]);

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

  return (
    <>
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div className="w-full bg-[#f8f9fb] py-6 px-4">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
          <div className="lg:w-64">
            <SideFilter
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              setFilters={setFilters}
            />
          </div>

          {/* PRODUCTS */}
          <div className="flex-1">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                {category || "All Products"}
              </h2>

              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden border px-4 py-2 rounded-full text-sm font-semibold bg-white shadow"
              >
                <Filter size={16} />
              </button>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

              {errorMessage ? (
                <div className="col-span-full rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
                  <h3 className="text-lg font-semibold text-red-700">Products could not be loaded</h3>
                  <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                </div>
              ) : products.length > 0 ? (
                products.map(product => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                  >

                    {/* IMAGE */}
                    <div className="relative h-52 bg-gray-100 overflow-hidden">

                      <img
                        src={`${UPLOADS_BASE_URL}/${product.image}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        alt={product.name}
                      />

                      {/* HOVER ACTIONS */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

                        {/* 👁️ VIEW */}
                        <button
                          onClick={() => navigate(`/productDetail/${product._id}`)}
                          className="bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition"
                        >
                          <Eye size={16} />
                        </button>

                        {/* ❤️ WISHLIST */}
                        <button
                          onClick={async () => {
                            const result = await toggleWishlist(product);
                            if (result?.message) {
                              showFeedback(product._id, result.message);
                            }
                          }}
                          className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
                        >
                          <Heart
                            size={16}
                            className={isWishlisted(product._id) ? "fill-red-500 text-red-500" : ""}
                          />
                        </button>
                      </div>

                      {feedbackById[product._id] && (
                        <div className="absolute left-3 right-3 bottom-3 rounded-full bg-black/75 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white">
                          {feedbackById[product._id]}
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="p-4">

                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-lg font-bold text-black mt-1">
                        ₹{product.price}
                      </p>

                      {/* ACTION */}
                      <button
                        onClick={async () => {
                          const result = await AddToCart(product);
                          if (result?.message) {
                            showFeedback(product._id, result.message);
                          }
                        }}
                        className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition 
                        ${isItemInCart(product._id)
                            ? "bg-[#CFA969] text-white"
                            : "bg-black text-white hover:bg-gray-800"
                          }`}
                      >
                        <ShoppingCart size={14} className="inline mr-1" />
                        {isItemInCart(product._id) ? "Added to Cart" : "Add to Cart"}
                      </button>

                    </div>

                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-500">
                  No product found
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
