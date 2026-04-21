import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { getOrders, requestCancelOrder } from '../api/callApi';
import { UPLOADS_BASE_URL } from '../api/AxiosApi';
import { useAuth } from '../hooks/useAuth';

const ORDER_STATUS_STYLES = {
  placed: 'bg-blue-100 text-blue-700',
  processing: 'bg-amber-100 text-amber-700',
  shipped: 'bg-violet-100 text-violet-700',
  delivered: 'bg-green-100 text-green-700',
  cancel_requested: 'bg-red-100 text-red-700',
  cancelled: 'bg-slate-200 text-slate-700',
};

export default function OrdersReturns() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.data?.orders || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    } else {
      setLoading(false);
      setOrders([]);
    }
  }, [isLoggedIn]);

  const handleCancelRequest = async (orderId) => {
    try {
      await requestCancelOrder(orderId);
      fetchOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#111827]">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Orders</p>
            <h1 className="text-4xl font-bold tracking-tight">All Orders</h1>
            <p className="text-slate-500 mt-3">View your orders, check the current status, request cancel when allowed, and leave feedback after delivery.</p>
          </div>

          <button
            onClick={() => navigate('/account')}
            className="px-5 py-3 rounded-full border border-slate-300 bg-white text-sm font-semibold"
          >
            Back to Account
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm px-8 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Login to view your orders</h2>
            <p className="text-slate-500 mb-8">Orders are now connected to the backend, so you need to sign in to see them.</p>
            <button
              onClick={() => navigate('/authPage')}
              className="px-6 py-4 rounded-2xl bg-[#111827] text-white font-semibold uppercase text-xs tracking-[0.2em]"
            >
              Go to Login
            </button>
          </div>
        ) : loading ? (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm px-8 py-16 text-center">
            <p className="text-slate-500">Loading orders...</p>
          </div>
        ) : orders.length ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const canCancel = ['placed', 'processing'].includes(order.status);
              const isDelivered = order.status === 'delivered';
              const statusClass = ORDER_STATUS_STYLES[order.status] || ORDER_STATUS_STYLES.placed;

              return (
                <section key={order._id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-1">Order ID</p>
                        <p className="font-semibold">{order._id}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-1">Placed On</p>
                        <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-1">Payment</p>
                        <p className="font-semibold">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-1">Total</p>
                        <p className="font-semibold">Rs. {order.totalAmount}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] ${statusClass}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleCancelRequest(order._id)}
                        disabled={!canCancel}
                        className="px-4 py-2 rounded-full border border-red-200 text-red-600 text-sm font-semibold disabled:border-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed"
                      >
                        Request Cancel
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_300px] gap-6 px-8 py-8">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={`${order._id}-${index}`} className="flex items-center gap-4 border border-slate-100 rounded-2xl p-4">
                          <img
                            src={`${UPLOADS_BASE_URL}/${item.productId?.image}`}
                            alt={item.productId?.name}
                            className="w-16 h-20 rounded-2xl bg-slate-50 object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.productId?.name}</p>
                            <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                            <p className="text-sm text-slate-500">Price Rs. {item.productId?.price}</p>

                            {isDelivered && item.productId?._id ? (
                              <button
                                onClick={() => navigate(`/productDetail/${item.productId._id}`)}
                                className="mt-3 inline-flex items-center rounded-full bg-[#111827] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#CFA969]"
                              >
                                Write Review
                              </button>
                            ) : null}
                          </div>
                          <p className="font-semibold">Rs. {item.lineTotal}</p>
                        </div>
                      ))}
                    </div>

                    <aside className="bg-slate-50 rounded-[1.5rem] p-6 border border-slate-100 h-fit">
                      <h2 className="font-bold text-lg mb-4">Delivery Details</h2>
                      <div className="space-y-3 text-sm text-slate-600">
                        <p><span className="font-semibold text-slate-800">Name:</span> {order.address.fullName}</p>
                        <p><span className="font-semibold text-slate-800">Phone:</span> {order.address.phone}</p>
                        <p><span className="font-semibold text-slate-800">Address:</span> {order.address.street}, {order.address.city}, {order.address.state} - {order.address.postalCode}</p>
                      </div>
                    </aside>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm px-8 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-3">No orders found</h2>
            <p className="text-slate-500 mb-8">Place your first order and it will appear here.</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-4 rounded-2xl bg-[#111827] text-white font-semibold uppercase text-xs tracking-[0.2em]"
            >
              Browse Products
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
