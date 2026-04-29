import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { createOrder, viewCart } from '../api/callApi';
import { resolveImageUrl } from '../api/AxiosApi';
import { useAuth } from '../hooks/useAuth';

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  landmark: ''
};

export default function Checkout() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod] = useState('Cash on Delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
const getGuestCart = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

useEffect(() => {
  const fetchCart = async () => {
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
      console.log("ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, [isLoggedIn]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.productId?.price) || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : cartItems.length ? 99 : 0;
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + shipping + tax;

  const isAddressValid =
    form.fullName &&
    form.phone &&
    form.street &&
    form.city &&
    form.state &&
    form.postalCode;

  const canPlaceOrder = isLoggedIn && cartItems.length > 0 && isAddressValid;

  const paymentLabel = paymentMethod;

  const handlePlaceOrder = async () => {
  if (!canPlaceOrder) return;

  const address = {
    fullName: form.fullName,
    phone: form.phone,
    email: form.email,
    street: form.street,
    city: form.city,
    state: form.state,
    postalCode: form.postalCode,
    landmark: form.landmark
  };

  try {
    await createOrder({
      address,
      paymentMethod
    });
    setOrderPlaced(true);
  } catch (error) {
    alert(error.response?.data?.message || "Unable to place order");
    console.log(error.response?.data || error.message);
  }
};  if (orderPlaced) {
    return (
      <div className="bg-[#f8f6f1] min-h-screen text-[#1a1a1a]">
        <main className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-stone-200 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3">Order Confirmed</p>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Your order has been placed</h1>
            <p className="text-stone-500 mb-8">
              Your order details have been saved. You can now open the orders page to see the latest backend order status.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm mb-8">
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-stone-400 uppercase tracking-widest text-[10px] mb-1">Payment</p>
                <p className="font-semibold">{paymentLabel}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-stone-400 uppercase tracking-widest text-[10px] mb-1">Deliver To</p>
                <p className="font-semibold">{form.city}, {form.state}</p>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-stone-400 uppercase tracking-widest text-[10px] mb-1">Total</p>
                <p className="font-semibold">Rs. {totalAmount}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/orders')}
                className="px-6 py-4 rounded-2xl bg-[#1a1a1a] text-white font-semibold uppercase text-xs tracking-[0.2em]"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-4 rounded-2xl border border-stone-300 font-semibold uppercase text-xs tracking-[0.2em]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6f1] min-h-screen text-[#1a1a1a]">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-2">Checkout</p>
            <h1 className="text-4xl font-bold tracking-tight">Address and Payment</h1>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="px-5 py-3 rounded-full border border-stone-300 text-sm font-semibold"
          >
            Back to Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.8fr] gap-10">
          <section className="space-y-8">
            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Delivery Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black md:col-span-2" />
                <input name="street" value={form.street} onChange={handleChange} placeholder="House No, Street, Area" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black md:col-span-2" />
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black" />
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black" />
                <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="PIN Code" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black" />
                <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" className="rounded-2xl border border-stone-200 px-4 py-4 outline-none focus:border-black" />
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Payment Method</h2>
              <div className="rounded-[1.5rem] bg-stone-50 p-5 border border-stone-200">
                <p className="font-semibold">{paymentLabel}</p>
                <p className="text-sm text-stone-500 mt-1">Pay when the order arrives.</p>
              </div>
            </div>
          </section>

          <aside className="bg-[#1d1d1d] text-white rounded-[2rem] p-8 shadow-lg h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Your Order</h2>

            <div className="space-y-4 border-b border-white/10 pb-6">
              {loading ? (
                <p className="text-white/60">Loading cart...</p>
              ) : cartItems.length ? (
                cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <img
                      src={resolveImageUrl(item.productId?.image)}
                      alt={item.productId?.name}
                      className="w-16 h-20 rounded-2xl bg-white/10 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.productId?.name}</p>
                      <p className="text-sm text-white/60">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold">Rs. {(Number(item.productId?.price) || 0) * (item.quantity || 1)}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/60">Your cart is empty.</p>
              )}
            </div>

            <div className="space-y-3 py-6 border-b border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Shipping</span>
                <span>Rs. {shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Tax</span>
                <span>Rs. {tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-end py-6">
              <span className="text-white/60 uppercase tracking-[0.2em] text-xs">Total</span>
              <span className="text-3xl font-bold">Rs. {totalAmount}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!canPlaceOrder}
              className="w-full rounded-2xl bg-[#d8ff72] text-black py-5 font-bold uppercase text-xs tracking-[0.2em] disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
            >
              Place Order
            </button>

            <p className="text-[11px] text-white/50 mt-4 text-center">
              {isLoggedIn
                ? 'Fill address and payment details to enable order placement.'
                : 'Login first to place an order and view it from the backend orders page.'}
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
