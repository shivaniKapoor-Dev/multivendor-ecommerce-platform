import React, { useState } from "react";
import { signUpVendor } from "../api/callApi";
import { useNavigate } from "react-router-dom";

export default function AuthPAgeVendor() {

  const navigate = useNavigate();
  const [errorShow, setErrorShow] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
    panNumber: "",
    gstNumber: "",
    accountNumber: "",
    ifscCode: "",
    country: "",
    state: "",
    city: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (["panNumber", "gstNumber", "ifscCode"].includes(name)) {
      value = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      await signUpVendor({ ...formData, role: "vendor" });
      alert("Business Account Created Successfully");
      navigate("/authPage");
    } catch (error) {
      setErrorShow(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-10 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Start Selling on TheLuvia
        </h1>
        <p className="mt-2 text-white/90">
          Reach thousands of customers. Grow your business faster.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3">Why Sell With Us?</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>✔ Zero registration fee</li>
              <li>✔ Secure & fast payments</li>
              <li>✔ Easy product management</li>
              <li>✔ Dedicated seller support</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-3">How It Works</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>1️⃣ Register your business</li>
              <li>2️⃣ Add your products</li>
              <li>3️⃣ Start receiving orders</li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Create Business Account
          </h2>

          {errorShow && (
            <p className="text-red-500 text-sm mb-4">{errorShow}</p>
          )}

          <form onSubmit={submitHandle} className="space-y-6">

            {/* Owner Info */}
            <div>
              <h4 className="section-title">Owner Information</h4>
              <div className="space-y-4">
                <input name="name" placeholder="Owner Name" onChange={handleChange} className="input" required />
                <input name="email" placeholder="Business Email" onChange={handleChange} className="input" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
              </div>
            </div>

            {/* Business Info */}
            <div>
              <h4 className="section-title">Business Details</h4>
              <div className="space-y-4">
                <input name="storeName" placeholder="Store Name" onChange={handleChange} className="input" required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="panNumber" placeholder="PAN Number" onChange={handleChange} className="input" required />
                  <input name="gstNumber" placeholder="GST Number" onChange={handleChange} className="input" required />
                </div>
              </div>
            </div>

            {/* Address Section ✅ NEW */}
            <div>
              <h4 className="section-title">Business Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="country" placeholder="Country" onChange={handleChange} className="input" required />
                <input name="state" placeholder="State" onChange={handleChange} className="input" required />
                <input name="city" placeholder="City" onChange={handleChange} className="input" required />
              </div>
            </div>

            {/* Bank Info */}
            <div>
              <h4 className="section-title">Bank Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="accountNumber" placeholder="Account Number" onChange={handleChange} className="input" required />
                <input name="ifscCode" placeholder="IFSC Code" onChange={handleChange} className="input" required />
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold">
              Register Business
            </button>

          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/authPage")}
              className="text-green-600 cursor-pointer font-medium"
            >
              Login
            </span>
          </p>

        </div>

      </div>

      <style>{`
        .input {
          width:100%;
          padding:12px;
          border-radius:10px;
          border:1px solid #ddd;
          outline:none;
          font-size:14px;
        }
        .input:focus{
          border-color:#16a34a;
          box-shadow:0 0 0 2px rgba(22,163,74,0.2);
        }
        .section-title{
          font-weight:600;
          margin-bottom:12px;
          color:#374151;
        }
      `}</style>

    </div>
  );
}