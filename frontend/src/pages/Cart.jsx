import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import Footer from '../components/Footer';
import { quantityCart, viewCart } from '../api/callApi';
import { useCart } from '../context/CartContext';
import { useAuth } from "../hooks/useAuth";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { deleteCartItems } = useCart();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const getGuestCart = () => {
        try {
            const data = JSON.parse(localStorage.getItem("cart"));
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    };

    const saveGuestCart = (items) => {
        localStorage.setItem("cart", JSON.stringify(items));
    };

    const fetchingData = async () => {
        try {
            if (isLoggedIn) {
                const res = await viewCart();
                setCartItems(res.data?.cartItems || []);
            } else {
                const stored = getGuestCart();

                const formatted = stored.map((item, index) => {
                    const { quantity, ...productData } = item;

                    return {
                        _id: item._id || index,
                        productId: productData,
                        quantity: quantity || 1
                    };
                });

                setCartItems(formatted);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const updateGuestQuantity = (productId, quantity) => {
        const stored = getGuestCart();
        const updated = stored.map((product) =>
            product._id === productId ? { ...product, quantity } : product
        );

        saveGuestCart(updated);
        setCartItems((prev) =>
            prev.map((item) =>
                item.productId?._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const handleQuantityChange = async (item, change) => {
        const newQty = item.quantity + change;

        if (newQty < 1) {
            return;
        }

        try {
            if (isLoggedIn) {
                await quantityCart(item._id, { quantity: newQty });
                setCartItems((prev) =>
                    prev.map((cartItem) =>
                        cartItem._id === item._id
                            ? { ...cartItem, quantity: newQty }
                            : cartItem
                    )
                );
            } else {
                updateGuestQuantity(item.productId?._id, newQty);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleDelete = async (item) => {
        try {
            if (isLoggedIn) {
                await deleteCartItems(item.productId?._id);
            } else {
                const updated = getGuestCart().filter(
                    (product) => product._id !== item.productId?._id
                );
                saveGuestCart(updated);
                window.dispatchEvent(new Event("cart-updated"));
            }

            setCartItems((prev) =>
                prev.filter((cartItem) => cartItem.productId?._id !== item.productId?._id)
            );
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchingData();
    }, [isLoggedIn]);

    const subtotal = cartItems.reduce(
        (total, item) => total + (Number(item.productId?.price) || 0) * (item.quantity || 1),
        0
    );
    const shipping = subtotal > 1000 ? 0 : cartItems.length ? 99 : 0;
    const tax = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + shipping + tax;

    return (
        <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a]">
            <main className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tighter mb-10 uppercase">Your Shopping Bag</h1>

                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3 space-y-8">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 items-center sm:items-start text-center sm:text-left"
                                >
                                    <div className="w-32 h-40 bg-white rounded-2xl border border-gray-100 flex items-center justify-center p-4 shadow-sm shrink-0">
                                        <img
                                            src={`http://localhost:2425/uploads/${item.productId?.image}`}
                                            alt={item.productId?.name}
                                            className="max-h-full object-contain"
                                        />
                                    </div>

                                    <div className="flex-grow space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold tracking-tight">{item.productId?.name}</h3>

                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                            {item.productId?.description}
                                        </p>

                                        <div className="flex items-center gap-4 pt-4 justify-center sm:justify-start">
                                            <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 gap-4">
                                                <button
                                                    onClick={() => handleQuantityChange(item, -1)}
                                                    className="text-gray-500 hover:text-black font-bold"
                                                >
                                                    -
                                                </button>

                                                <span className="text-sm font-medium w-4 text-center">
                                                    {item?.quantity}
                                                </span>

                                                <button
                                                    onClick={() => handleQuantityChange(item, 1)}
                                                    className="text-gray-500 hover:text-black font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="font-bold text-sm">
                                                Rs. {item.productId?.price}
                                            </p>
                                        </div>

                                        <p className={`text-sm py-2 px-2 ${item.productId?.inStock ? "text-green-500" : "text-red-500"}`}>
                                            {item.productId?.inStock ? 'In Stock' : 'Out of Stock'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                                <p className="text-gray-400 italic">Your bag is currently empty.</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6 tracking-tight uppercase">Order Summary</h2>

                            <div className="space-y-4 text-sm border-b border-gray-100 pb-6">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>Rs. {subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Estimated Shipping</span>
                                    <span>Rs. {shipping}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Tax</span>
                                    <span>Rs. {tax}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end pt-6 mb-8">
                                <span className="font-bold uppercase text-xs tracking-widest text-gray-400">Total Amount</span>
                                <span className="text-2xl font-bold tracking-tighter">Rs. {totalAmount}</span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                disabled={!cartItems.length}
                                className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-bold hover:bg-black transition-all active:scale-[0.98] uppercase text-xs tracking-[0.2em] shadow-lg shadow-black/10 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                Proceed to Checkout
                            </button>

                            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-tighter">
                                Secure Payment Powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
