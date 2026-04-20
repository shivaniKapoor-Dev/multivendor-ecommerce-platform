import { useEffect, useState } from "react";
import { Vendors, userInfo, getAdminOrders } from "../api/callApi";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, vendorsRes, ordersRes] = await Promise.all([
          userInfo(),
          Vendors(),
          getAdminOrders(),
        ]);

        const userLogs = (usersRes.data?.user || []).slice(0, 3).map((user) => ({
          title: `New user: ${user.name}`,
          sub: user.email,
        }));

        const vendorLogs = (vendorsRes.data?.vendor || []).slice(0, 3).map((vendor) => ({
          title: `Vendor: ${vendor.storeName}`,
          sub: vendor.status,
        }));

        const orderLogs = (ordersRes.data?.orders || []).slice(0, 4).map((order) => ({
          title: `Order: ${order._id}`,
          sub: order.status,
        }));

        setLogs([...userLogs, ...vendorLogs, ...orderLogs]);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Admin Logs</h1>
        <p className="text-sm text-gray-500">Simple recent activity view.</p>
      </div>

      <div className="space-y-3">
        {logs.map((log, index) => (
          <div key={index} className="bg-white rounded-xl border p-4">
            <p className="font-semibold">{log.title}</p>
            <p className="text-sm text-gray-500">{log.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
