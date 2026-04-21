import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { History, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { recentProducts, getProduct } from '../api/callApi';
import { UPLOADS_BASE_URL } from '../api/AxiosApi';
import { useAuth } from '../hooks/useAuth';

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [feedbackById, setFeedbackById] = useState({});

  const { AddToCart, isItemInCart } = useCart();
  const { isLoggedIn } = useAuth();

  const dedupeProducts = (items = []) => {
    const seen = new Set();

    return items.filter((item) => {
      const id = item?._id?.toString();

      if (!id || seen.has(id)) {
        return false;
      }

      seen.add(id);
      return true;
    });
  };

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        if (isLoggedIn) {
          const res = await recentProducts();

          const items = res.data?.items || [];
          const formatted = dedupeProducts(
            items.map(item => item.productId).filter(Boolean)
          );

          setProducts(formatted);
        } else {
          const storedViewed = JSON.parse(localStorage.getItem("viewed")) || [];
          const uniqueViewed = [...new Set(storedViewed.filter(Boolean))];
          const viewed = [...uniqueViewed].reverse();

          if (viewed.length === 0) {
            setProducts([]);
            return;
          }

          const responses = await Promise.allSettled(
            viewed.map(id => getProduct(id))
          );

          const validProducts = [];
          const validIds = [];

          responses.forEach((result, index) => {
            if (result.status === "fulfilled" && result.value.data?.product) {
              validProducts.push(result.value.data.product);
              validIds.push(viewed[index]);
            }
          });

          if (validIds.length !== uniqueViewed.length) {
            localStorage.setItem("viewed", JSON.stringify(validIds));
          }

          setProducts(dedupeProducts(validProducts));
        }
      } catch (error) {
        console.error("Error fetching history", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, [isLoggedIn]);

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

  if (loading || products.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 md:py-16 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-full">
              <History size={18} className="text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-tight">
                Recently Viewed
              </h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                Based on your browsing history
              </p>
            </div>
          </div>

          {visibleCount < products.length && (
            <button
              onClick={() => setVisibleCount(prev => prev + 5)}
              className="text-xs font-bold text-[#CFA969] hover:underline"
            >
              VIEW MORE
            </button>
          )}
        </div>

        <div className="flex overflow-x-auto pb-6 gap-4 snap-x hide-scrollbar md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <div
              key={product?._id}
              className="min-w-[160px] sm:min-w-[200px] md:min-w-0 snap-start group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-3 transition-all group-hover:shadow-md">
                <Link to={`/productDetail/${product._id}`}>
                  <img
                    src={`${UPLOADS_BASE_URL}/${product?.image}`}
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                <button
                  onClick={async () => {
                    const result = await AddToCart(product);
                    if (result?.message) {
                      showFeedback(product._id, result.message);
                    }
                  }}
                  className={`absolute bottom-2 right-2 p-2 rounded-xl shadow-lg transition-all active:scale-90 ${
                    isItemInCart(product._id)
                      ? "bg-[#CFA969] text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <ShoppingCart size={16} />
                </button>

                {feedbackById[product._id] && (
                  <div className="absolute left-2 right-2 bottom-2 rounded-full bg-black/75 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-white">
                    {feedbackById[product._id]}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-[#CFA969] transition-colors">
                  {product?.name}
                </h3>

                <p className="text-[11px] text-gray-500 line-clamp-1">
                  {product?.details}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">
                    Rs. {product?.price}
                  </span>

                  <span className="text-[10px] text-gray-400 line-through">
                    Rs. {product?.price + 500}
                  </span>
                </div>
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
