import React, { useState } from "react";

export default function ManageProfile() {
  const [user, setUser] = useState({
    name: "Shivi",
    email: "shivi@email.com",
    phone: "9876543210"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved:", user);
    // API call later
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Sidebar */}
        <div className="bg-white p-6 rounded-2xl border">
          <h2 className="text-lg font-bold mb-4">Your Account</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="font-semibold text-blue-600">Profile</li>
            <li>Orders</li>
            <li>Addresses</li>
            <li>Payments</li>
            <li>Security</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 bg-white p-8 rounded-2xl border">

          <h1 className="text-2xl font-bold mb-6">Manage Profile</h1>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Full Name" name="name" value={user.name} onChange={handleChange} />
            <Input label="Email" name="email" value={user.email} onChange={handleChange} />
            <Input label="Phone Number" name="phone" value={user.phone} onChange={handleChange} />
          </div>

          {/* Customer Features */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl">
            <h3 className="font-semibold mb-2">Your Activity</h3>
            <p className="text-sm text-slate-600">
              🛒 Orders • ❤️ Wishlist • 📦 Track Orders • 💳 Payments
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input */
function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-500 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}