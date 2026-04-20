import React, { useEffect, useMemo, useState } from "react";
import { updateUserStatus, userInfo } from "../api/callApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userInfo();
        setUsers(res.data?.user || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name} ${user.email}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [users, search]);

  const updateStatus = async (id, status) => {
    try {
      await updateUserStatus(id, { status });
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, status } : user))
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin User Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border rounded-lg w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow border overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {u.status === "active" ? (
                      <button onClick={() => updateStatus(u._id, "blocked")} className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                        Block
                      </button>
                    ) : (
                      <button onClick={() => updateStatus(u._id, "active")} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {filteredUsers.map((u) => (
          <div key={u._id} className="bg-white p-4 rounded-2xl shadow border">
            <h3 className="font-semibold">{u.name}</h3>
            <p className="text-sm text-gray-600">{u.email}</p>
            <p className="text-sm text-gray-600 mt-1">Role: {u.role}</p>
            <div className="mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {u.status}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              {u.status === "active" ? (
                <button onClick={() => updateStatus(u._id, "blocked")} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm">
                  Block
                </button>
              ) : (
                <button onClick={() => updateStatus(u._id, "active")} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">
                  Unblock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
