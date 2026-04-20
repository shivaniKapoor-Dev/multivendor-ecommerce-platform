import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getAdminSummary } from "../api/callApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminSummary();
        const summary = res.data?.summary || {};
        setStats({
          users: summary.users || 0,
          vendors: summary.vendors || 0,
          products: summary.products || 0,
          orders: summary.orders || 0,
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your platform performance</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Users" value={stats.users} />
        <StatCard title="Vendors" value={stats.vendors} />
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Orders" value={stats.orders} />
      </div>

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Platform Summary</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Total customers registered: {stats.users}</li>
            <li>Total vendors registered: {stats.vendors}</li>
            <li>Total products listed: {stats.products}</li>
            <li>Total orders placed: {stats.orders}</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Quick Notes</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Approve vendors from the vendor page.</li>
            <li>Update order status from the orders page.</li>
            <li>Manage users from the users page.</li>
            <li>Review all products from the products page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
