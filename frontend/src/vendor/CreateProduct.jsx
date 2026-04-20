import React, { useState } from "react";
import { createProduct } from "../api/callApi";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    discount: "",
    quantity: "",
    description: "",
    details: "",
    colour: "",
    inStock: true,
    tags: "",
    sizes: "",
    trending: false,
    featured: false,
    bestseller: false,
    limitedTimeDeal: false,
    isNewArrival: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "tags" || key === "sizes") return;
        formData.append(key, form[key]);
      });

      formData.append(
        "tags",
        JSON.stringify(form.tags.split(",").map((i) => i.trim()))
      );

      formData.append(
        "sizes",
        JSON.stringify(form.sizes.split(",").map((i) => i.trim()))
      );

      if (image) formData.append("image", image);

      await createProduct(formData);

      alert("Product Created ✅");
      navigate("/vendorDashboard");
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Create New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC INFO */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Basic Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" name="name" placeholder="Product Name" onChange={handleChange} required />
              <input className="input" name="brand" placeholder="Brand" onChange={handleChange} />
              <input className="input" name="category" placeholder="Category" onChange={handleChange} required />
              <input className="input" name="subCategory" placeholder="Sub Category" onChange={handleChange} />
            </div>
          </div>

          {/* PRICING */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="number" className="input" name="price" placeholder="Price" onChange={handleChange} required />
              <input type="number" className="input" name="discount" placeholder="Discount %" onChange={handleChange} />
              <input type="number" className="input" name="quantity" placeholder="Quantity" onChange={handleChange} />
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Details</h2>

            <textarea className="input h-24" name="description" placeholder="Description" onChange={handleChange} required />
            <textarea className="input h-24 mt-3" name="details" placeholder="Extra Details" onChange={handleChange} required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <input className="input" name="colour" placeholder="Colour" onChange={handleChange} />
              <input className="input" name="sizes" placeholder="Sizes (S, M, L)" onChange={handleChange} />
            </div>

            <input className="input mt-3" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
          </div>

          {/* FLAGS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Flags</h2>

            <div className="flex flex-wrap gap-4">
              {["trending", "featured", "bestseller", "limitedTimeDeal", "isNewArrival"].map((flag) => (
                <label key={flag} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={flag} onChange={handleChange} />
                  {flag}
                </label>
              ))}
            </div>

            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
              In Stock
            </label>
          </div>

          {/* IMAGE */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Product Image</h2>

            <input type="file" onChange={handleImage} />

            {preview && (
              <img src={preview} className="w-32 h-32 object-cover mt-4 rounded-lg border" />
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>

        </form>
      </div>

      {/* INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 14px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: black;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
