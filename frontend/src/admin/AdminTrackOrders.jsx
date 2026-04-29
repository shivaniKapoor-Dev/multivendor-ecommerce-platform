import React, { useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus } from '../api/callApi';
import { resolveImageUrl } from '../api/AxiosApi';

export default function AdminTrackOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAdminOrders();
      setOrders(res.data?.orders || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, { status });
      fetchOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>
        <p className="text-sm text-gray-500">Simple admin view to check every order and update status.</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">Loading orders...</div>
      ) : orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border p-6 shadow-sm">
              <div className="grid lg:grid-cols-[1fr_220px] gap-6">
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Order ID</p>
                      <p className="font-semibold">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Customer</p>
                      <p className="font-semibold">{order.user?.name || "Customer"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="font-semibold">{order.user?.email || "-"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Total</p>
                      <p className="font-semibold">Rs. {order.totalAmount}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={`${order._id}-${index}`} className="flex items-center gap-4 border rounded-xl p-4">
                        <img
                          src={resolveImageUrl(item.productId?.image)}
                          alt={item.productId?.name}
                          className="w-14 h-16 rounded-lg object-cover bg-gray-50"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.productId?.name}</p>
                          <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                        <p className="font-semibold">Rs. {item.lineTotal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border h-fit">
                  <p className="text-sm text-gray-500 mb-2">Current Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="placed">Placed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancel_requested">Cancel Requested</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <div className="mt-4 text-sm text-gray-600">
                    <p><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
                    <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">No orders found.</div>
      )}
    </div>
  );
}
