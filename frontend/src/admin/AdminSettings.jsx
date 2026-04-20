import { useState } from "react";
import { changePassword } from "../api/callApi";

export default function AdminSettings() {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Admin Settings</h1>
        <p className="text-sm text-gray-500">Change admin password here.</p>
      </div>

      <div className="bg-white rounded-2xl border p-6 max-w-2xl">
        {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
        <div className="grid md:grid-cols-2 gap-4">
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} placeholder="Current Password" className="border rounded-lg px-3 py-2" />
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="New Password" className="border rounded-lg px-3 py-2" />
        </div>
        <button onClick={handleSave} className="mt-4 bg-black text-white px-5 py-2 rounded-lg">
          Change Password
        </button>
      </div>
    </div>
  );
}
