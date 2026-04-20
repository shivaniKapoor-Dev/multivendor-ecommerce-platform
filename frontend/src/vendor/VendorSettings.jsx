import { useState } from "react";
import { changePassword } from "../api/callApi";

export default function VendorSettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await changePassword(formData);
      setMessage(res.data?.message || "Password changed");
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h1 className="text-2xl font-semibold mb-2">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Change your password here.</p>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} placeholder="Current Password" className="w-full border rounded-lg px-3 py-2" />
        <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="New Password" className="w-full border rounded-lg px-3 py-2" />
      </div>

      <button onClick={handleSave} className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
        Change Password
      </button>
    </div>
  );
}
