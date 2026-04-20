import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getVendorOrders, productPage, vendorDashboard } from "../api/callApi";

export default function VendorDashboard() {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendorRes, productRes, orderRes] = await Promise.all([
          vendorDashboard(),
          productPage(),
          getVendorOrders(),
        ]);

        setVendor(vendorRes.data?.user || null);
        setProducts(productRes.data?.products || []);
        setOrders(orderRes.data?.orders || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  if (!vendor) {
    return <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  if (vendor.status === "pending") {
    return <div className="bg-white rounded-2xl border p-8 text-center">Your vendor account is waiting for admin approval.</div>;
  }

  if (vendor.status === "blocked") {
    return <div className="bg-white rounded-2xl border p-8 text-center">Your vendor account is blocked by admin.</div>;
  }

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + (item.lineTotal || 0), 0);
  }, 0);
  const pendingOrders = orders.filter((order) => order.status === "placed" || order.status === "processing").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Store Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your store details and orders.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Store Name" value={vendor.storeName} />
        <StatCard title="Products" value={totalProducts} />
        <StatCard title="Orders" value={totalOrders} />
        <StatCard title="Revenue" value={`Rs. ${totalRevenue}`} />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Store Information</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">Status:</span> {vendor.status}</p>
            <p><span className="font-medium text-gray-800">Verified:</span> {vendor.isVerified ? "Yes" : "No"}</p>
            <p><span className="font-medium text-gray-800">City:</span> {vendor.address?.city || "-"}</p>
            <p><span className="font-medium text-gray-800">State:</span> {vendor.address?.state || "-"}</p>
            <p><span className="font-medium text-gray-800">Country:</span> {vendor.address?.country || "-"}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p><span className="font-medium text-gray-800">Pending Orders:</span> {pendingOrders}</p>
            <p><span className="font-medium text-gray-800">Delivered Orders:</span> {orders.filter((order) => order.status === "delivered").length}</p>
            <p><span className="font-medium text-gray-800">Cancel Requests:</span> {orders.filter((order) => order.status === "cancel_requested").length}</p>
            <p><span className="font-medium text-gray-800">Bank Name:</span> {vendor.bankName || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
