import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import RelatedProducts from './RelatedProducts';
import RecentProducts from './RecentProducts';
import { addProductReview, getOrders, getProduct, trackProductVisit } from '../api/callApi';
import { Heart, Share2, Star, ChevronRight, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [canReview, setCanReview] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { AddToCart, isItemInCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!id) return;

    setAdded(false);
    setSelectedSize("");

    const fetchData = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await getProduct(id);
        setProduct(res.data?.product);

        if (isLoggedIn) {
          try {
            const orderRes = await getOrders();
            const orders = orderRes.data?.orders || [];

            const eligible = orders.some((order) =>
              order.status === "delivered" &&
              order.items?.some((item) => item.productId?._id?.toString() === id.toString())
            );

            setCanReview(eligible);
          } catch (orderError) {
            console.log(orderError.response?.data || orderError.message);
            setCanReview(false);
          }
        } else {
          setCanReview(false);
        }

        if (isLoggedIn) {
          await trackProductVisit(id);
        } else {
          const viewed = JSON.parse(localStorage.getItem("viewed")) || [];

          if (!viewed.includes(id)) {
            localStorage.setItem("viewed", JSON.stringify([...viewed, id]));
          }
        }
      } catch (err) {
        console.log(err);
        setNotFound(true);
      } finally {
      setLoading(false);
    }
  };

    fetchData();
  }, [id, isLoggedIn]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-pulse text-[#fc2779] font-bold uppercase">
          Loading Product...
        </div>
      </div>
    );
  }

  if (notFound || !product?.name) {
    return (
      <div className="bg-[#f3f3f3] min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center max-w-md w-full">
            <h2 className="text-xl font-bold text-[#3f414d] mb-2">Product not available</h2>
            <p className="text-sm text-gray-500">
              This product is blocked, removed, or the vendor is not active.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.discount || 0;
  const mrp = product.price + (product.price * (discount / 100));

  const requiresSizeSelection = product.sizes?.length > 0 && !selectedSize;

  const handleAddToCart = async () => {
    if (requiresSizeSelection) {
      setMessage("Please select size");
      return;
    }

    const result = await AddToCart(product);
    setAdded(Boolean(result?.isAdded));
    setMessage(result?.message || "Added to cart");
  };

  const handleWishlist = async () => {
    const result = await toggleWishlist(product);
    if (result?.message) {
      setMessage(result.message);
    }
  };

  const handleBuyNow = async () => {
    if (!product.inStock) return;

    if (requiresSizeSelection) {
      setMessage("Please select size");
      return;
    }

    if (!isLoggedIn) {
      navigate("/authPage");
      return;
    }

    if (!isItemInCart(product._id)) {
      await AddToCart(product);
    }

    navigate("/checkout");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/authPage");
      return;
    }

    if (!reviewRating) {
      setMessage("Please select star rating");
      return;
    }

    try {
      setReviewLoading(true);
      const res = await addProductReview(product._id, {
        rating: reviewRating,
        comment: reviewComment
      });

      setProduct(res.data?.product || product);
      setMessage(res.data?.message || "Review added successfully");
      setReviewComment("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  const reviewCount = product.reviews?.length || 0;

  return (
    <>
      {message && (
        <p className="text-green-600 text-sm text-center mt-2">
          {message}
        </p>
      )}

      <div className="bg-[#f3f3f3] min-h-screen text-[#3f414d]">
        <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
          <nav className="flex items-center gap-2 text-[12px] text-gray-500 mb-6 bg-white p-3 rounded-md shadow-sm">
            <span>Home</span> <ChevronRight size={12} />
            <span>{product.category}</span> <ChevronRight size={12} />
            <span className="truncate">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-[45%]">
              <div className="relative bg-white rounded-lg p-6 border shadow-sm flex justify-center items-center min-h-[400px]">
                <img
                  src={
                    product.image
                      ? `http://localhost:2425/uploads/${product.image}`
                      : "/no-image.png"
                  }
                  alt={product.name}
                  className="max-h-[500px] object-contain"
                />

                {product.inStock && (
                  <p className="absolute top-3 left-3 bg-green-500 text-white px-4 py-1 rounded text-xs">
                    In Stock
                  </p>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button
                    onClick={handleWishlist}
                    className="p-2 bg-white rounded-full shadow"
                  >
                    <Heart
                      size={20}
                      className={
                        isWishlisted(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }
                    />
                  </button>

                  <button className="p-2 bg-white rounded-full shadow">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-[55%] bg-white p-6 rounded-lg shadow">
              <h2 className="text-[#fc2779] font-bold text-sm uppercase">
                {product.brand}
              </h2>

              <h1 className="text-xl md:text-2xl font-medium mt-1">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="bg-green-600 text-white px-2 py-1 rounded text-sm flex items-center">
                  {product.rating}
                  <Star size={14} className="ml-1 fill-white" />
                </div>
                <span className="text-gray-400 text-sm">{reviewCount} Reviews</span>
              </div>

              <hr className="my-4" />

              <div className="mb-6">
                <div className="flex gap-3 items-center">
                  <span className="text-2xl font-bold">
                    Rs. {product.price}
                  </span>

                  {product.discount > 0 && (
                    <>
                      <span className="line-through text-gray-400">
                        Rs. {mrp.toFixed(0)}
                      </span>
                      <span className="text-[#fc2779] font-bold">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold mb-2">Select Size</h4>

                {product.sizes?.length > 0 ? (
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded ${
                          selectedSize === size
                            ? "border-pink-500 text-pink-500"
                            : "border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Free Size</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded font-bold transition-colors disabled:bg-gray-300 ${
                    added || isItemInCart(product._id)
                      ? "bg-[#CFA969] text-white"
                      : "bg-[#fc2779] text-white"
                  }`}
                >
                  {product.inStock
                    ? (added || isItemInCart(product._id))
                      ? "Added to Cart"
                      : "Add to Cart"
                    : "Out of Stock"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 border border-[#fc2779] text-[#fc2779] py-3 rounded font-bold disabled:border-gray-300 disabled:text-gray-300"
                >
                  Buy Now
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-600">
                {product.description}
              </p>

              <div className="mt-8 rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-bold mb-3">Ratings & Reviews</h3>

                {canReview ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Your Rating</p>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="text-gray-300 transition"
                          >
                            <Star
                              size={22}
                              className={star <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Your Review</p>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={3}
                        placeholder="Write your review here"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#fc2779]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="bg-[#fc2779] text-white px-5 py-2.5 rounded font-semibold disabled:bg-gray-300"
                    >
                      {reviewLoading ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                ) : (
                  <p className="text-sm text-gray-500">                  </p>
                )}

                <div className="mt-6 space-y-4">
                  {reviewCount > 0 ? (
                    product.reviews.slice().reverse().map((review) => (
                      <div key={review._id} className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-sm text-gray-800">
                            {review.userName}
                          </p>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>

                        {review.comment ? (
                          <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 text-xs">
                <div className="flex items-center gap-2">
                  <Truck size={16} /> Free Delivery
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCcw size={16} /> Easy Return
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} /> Authentic
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="bg-white py-12 mt-10">
          <RecentProducts />
          <RelatedProducts category={product.category} />
        </div>

        <Footer />
      </div>
    </>
  );
}
