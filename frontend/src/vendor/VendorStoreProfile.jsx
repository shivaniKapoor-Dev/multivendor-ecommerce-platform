import { useEffect, useState } from "react";
import { updateVendorProfile, vendorDashboard } from "../api/callApi";

export default function VendorStoreProfile() {
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    country: "",
    state: "",
    city: "",
    street: "",
    pincode: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await vendorDashboard();
        const user = res.data?.user;

        setFormData({
          storeName: user?.storeName || "",
          description: user?.description || "",
          country: user?.address?.country || "",
          state: user?.address?.state || "",
          city: user?.address?.city || "",
          street: user?.address?.street || "",
          pincode: user?.address?.pincode || ""
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchVendor();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await updateVendorProfile(formData);
      setMessage(res.data?.message || "Profile updated");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h1 className="text-2xl font-semibold mb-2">Store Profile</h1>
      <p className="text-sm text-gray-500 mb-6">Update your store details here.</p>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Store Name" className="w-full border rounded-lg px-3 py-2" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Store Description" className="w-full border rounded-lg px-3 py-2" />
        <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full border rounded-lg px-3 py-2" />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full border rounded-lg px-3 py-2" />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full border rounded-lg px-3 py-2" />
        <input name="street" value={formData.street} onChange={handleChange} placeholder="Street" className="w-full border rounded-lg px-3 py-2" />
        <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border rounded-lg px-3 py-2" />
      </div>

      <button onClick={handleSave} className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
        Save Profile
      </button>
    </div>
  );
}
