import React, { useEffect, useState } from "react";
import { getVendorOrders } from "../api/callApi";
import { resolveImageUrl } from "../api/AxiosApi";

const STATUS_STYLE = {
  placed: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-violet-100 text-violet-700",
  delivered: "bg-green-100 text-green-700",
  cancel_requested: "bg-red-100 text-red-700",
  cancelled: "bg-slate-200 text-slate-700",
};

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getVendorOrders();
        setOrders(res.data?.orders || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Vendor Orders</h1>
        <p className="text-sm text-gray-500">View all orders that include your products.</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">Loading orders...</div>
      ) : orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
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
                    <p className="text-gray-400">Date</p>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[order.status] || STATUS_STYLE.placed}`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
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
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">No vendor orders found.</div>
      )}
    </div>
  );
}
