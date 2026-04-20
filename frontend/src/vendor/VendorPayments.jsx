import { useEffect, useState } from "react";
import { updateVendorBank, vendorDashboard } from "../api/callApi";

export default function VendorPayments() {
  const [formData, setFormData] = useState({
    accountNumber: "",
    ifscCode: "",
    bankName: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await vendorDashboard();
        const user = res.data?.user;

        setFormData({
          accountNumber: user?.accountNumber || "",
          ifscCode: user?.ifscCode || "",
          bankName: user?.bankName || ""
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
      const res = await updateVendorBank(formData);
      setMessage(res.data?.message || "Bank details updated");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl border p-6">
      <h1 className="text-2xl font-semibold mb-2">Payments</h1>
      <p className="text-sm text-gray-500 mb-6">Update your bank details here.</p>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" className="w-full border rounded-lg px-3 py-2" />
        <input name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" className="w-full border rounded-lg px-3 py-2" />
        <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" className="w-full border rounded-lg px-3 py-2" />
      </div>

      <button onClick={handleSave} className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
        Save Bank Details
      </button>
    </div>
  );
}
