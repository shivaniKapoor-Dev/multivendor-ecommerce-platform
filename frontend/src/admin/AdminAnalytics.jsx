import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getAdminSummary } from "../api/callApi";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    products: 0,
    orders: 0,
    revenue: 0,
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
          revenue: summary.revenue || 0,
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
        <p className="text-sm text-gray-500">Simple platform numbers for admin.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Users" value={stats.users} />
        <StatCard title="Vendors" value={stats.vendors} />
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Orders" value={stats.orders} />
        <StatCard title="Revenue" value={`Rs. ${stats.revenue}`} />
      </div>
    </div>
  );
}
