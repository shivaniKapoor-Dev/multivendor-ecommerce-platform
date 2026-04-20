import React, { useEffect, useState } from "react";
import { deleteProducts, productPage, updateProduct } from "../api/callApi";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productPage();
      setProducts(res.data?.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && editProduct) {
      setEditProduct({
        ...editProduct,
        newImageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProducts(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = (product) => {
    setEditProduct({
      ...product,
      // Convert arrays to comma-separated strings for the input fields
      category: product.category || "",
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags || "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "",
      subCategory: product.subCategory || "",
      brand: product.brand || "",
      trending: product.trending || false,
      featured: product.featured || false,
      bestseller: product.bestseller || false,
      limitedTimeDeal: product.limitedTimeDeal || false,
      isNewArrival: product.isNewArrival || false,
      inStock: product.inStock || false,
      discount: product.discount || 0,
      details: product.details || "",
      imagePreview: null,
      newImageFile: null
    });
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setShowEdit(false);
    setEditProduct(null);
  };

  const updateField = (field, value) => {
    setEditProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!editProduct) return;

    try {
      const formData = new FormData();

      // Basic Info
      formData.append("name", editProduct.name);
      formData.append("price", editProduct.price);
      formData.append("quantity", editProduct.quantity);
      formData.append("description", editProduct.description);
      formData.append("colour", editProduct.colour);
      formData.append("discount", editProduct.discount);
      formData.append("details", editProduct.details);

      // Strings (Controller handles .toLowerCase() and .split())
      formData.append("category", editProduct.category);
      formData.append("subCategory", editProduct.subCategory);
      formData.append("brand", editProduct.brand);
      formData.append("tags", editProduct.tags); 
      formData.append("sizes", editProduct.sizes);

      // Booleans (Controller uses toBoolean helper)
      formData.append("inStock", editProduct.inStock);
      formData.append("trending", editProduct.trending);
      formData.append("featured", editProduct.featured);
      formData.append("bestseller", editProduct.bestseller);
      formData.append("limitedTimeDeal", editProduct.limitedTimeDeal);
      formData.append("isNewArrival", editProduct.isNewArrival);

      if (editProduct.newImageFile) {
        formData.append("image", editProduct.newImageFile);
      }

      const res = await updateProduct(editProduct._id, formData);

      setMessage(res.data?.message || "Updated successfully");
      fetchProducts();
      closeEditModal();

      setTimeout(() => setMessage(""), 3000);

    } catch (error) {
      console.error("Update failed:", error?.response?.data || error.message);
      setMessage("Update failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {message && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg shadow">
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <button
            onClick={() => navigate("/vendor/Create/Products")}
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={`http://localhost:2425/uploads/${product.image}`}
                className="h-48 w-full object-contain mb-4"
                
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className={`text-sm mt-1 ${product.isBlocked ? "text-red-500" : "text-green-600"}`}>
                {product.isBlocked ? "Blocked by admin" : "Active"}
              </p>
              <p className="font-bold">₹{product.price}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEditModal(product)} className="p-2 bg-gray-100 rounded hover:bg-gray-200"><Edit size={18} /></button>
                <button onClick={() => handleDelete(product._id)} className="p-2 bg-gray-100 rounded hover:bg-red-100"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEdit && editProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between mb-6 border-b pb-2">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button onClick={closeEditModal}><X /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                <input className="w-full border p-2 rounded mb-2" value={editProduct.name} onChange={(e)=>updateField("name",e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
                <input type="number" className="w-full border p-2 rounded mb-2" value={editProduct.price} onChange={(e)=>updateField("price",e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                <input className="w-full border p-2 rounded mb-2" value={editProduct.category} onChange={(e)=>updateField("category",e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Sub Category</label>
                <input className="w-full border p-2 rounded mb-2" value={editProduct.subCategory} onChange={(e)=>updateField("subCategory",e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Tags (comma separated)</label>
                <input className="w-full border p-2 rounded mb-2" value={editProduct.tags} onChange={(e)=>updateField("tags",e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Sizes (comma separated)</label>
                <input className="w-full border p-2 rounded mb-2" value={editProduct.sizes} onChange={(e)=>updateField("sizes",e.target.value)} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 bg-gray-50 p-3 rounded">
               <label className="flex items-center gap-1"><input type="checkbox" checked={editProduct.inStock} onChange={(e)=>updateField("inStock",e.target.checked)} /> In Stock</label>
               <label className="flex items-center gap-1"><input type="checkbox" checked={editProduct.trending} onChange={(e)=>updateField("trending",e.target.checked)} /> Trending</label>
               <label className="flex items-center gap-1"><input type="checkbox" checked={editProduct.bestseller} onChange={(e)=>updateField("bestseller",e.target.checked)} /> BestSeller</label>
               <label className="flex items-center gap-1"><input type="checkbox" checked={editProduct.isNewArrival} onChange={(e)=>updateField("isNewArrival",e.target.checked)} /> New Arrival</label>
               <label className="flex items-center gap-1"><input type="checkbox" checked={editProduct.featured} onChange={(e)=>updateField("featured",e.target.checked)} /> Featured </label>
               <label className="flex items-center gap-1"><input type="checkbox" checked={editProduct.limitedTimeDeal} onChange={(e)=>updateField("limitedTimeDeal",e.target.checked)} /> Limited Time Deal</label>
           
            </div>

            <div className="mt-4">
              <label className="text-xs font-bold text-gray-500 uppercase">Change Image</label>
              <input type="file" className="block w-full text-sm mt-1" onChange={handleImageChange} />
              {editProduct.imagePreview && <img src={editProduct.imagePreview} className="mt-2 h-24 object-cover rounded" />}
            </div>

            <div className="mt-6 flex gap-2">
              <button onClick={handleUpdate} className="flex-1 bg-blue-600 text-white py-2 rounded font-bold">Update Product</button>
              <button onClick={closeEditModal} className="flex-1 bg-gray-200 py-2 rounded font-bold">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
