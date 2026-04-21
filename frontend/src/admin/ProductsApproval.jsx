import { useEffect, useState } from "react";
import { getAdminProducts, updateProductBlock } from "../api/callApi";
import { UPLOADS_BASE_URL } from "../api/AxiosApi";

export default function ProductsApproval() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAdminProducts();
        setProducts(res.data?.products || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleBlock = async (id, isBlocked) => {
    try {
      await updateProductBlock(id, { isBlocked });
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, isBlocked } : product
        )
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
        <p className="text-sm text-gray-500">Simple admin view for all listed products.</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border p-8 text-center text-gray-500">No products found.</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl border p-4 shadow-sm">
            <img
              src={`${UPLOADS_BASE_URL}/${product.image}`}
              alt={product.name}
              className="h-44 w-full object-contain mb-4 rounded-xl bg-gray-50"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="font-bold mt-2">Rs. {product.price}</p>
            <p className={`text-xs mt-2 ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className={`text-xs mt-1 ${product.isBlocked ? "text-red-600" : "text-blue-600"}`}>
              {product.isBlocked ? "Blocked" : "Visible"}
            </p>
            <button
              onClick={() => handleBlock(product._id, !product.isBlocked)}
              className={`mt-4 w-full py-2 rounded-lg text-sm font-medium ${
                product.isBlocked ? "bg-blue-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {product.isBlocked ? "Unblock Product" : "Block Product"}
            </button>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
