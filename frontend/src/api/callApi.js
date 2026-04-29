import Axios from './AxiosApi'

//register api
export const  signUp = async(data)=>{
return Axios.post('/register', data)
}
export const  signUpVendor = async(data)=>{
return Axios.post('/registervendor', data)
}

//login api
export const  signIn = async(data)=>{
return Axios.post('/login', data)
}

//vendors in admin page 
export const Vendors = async()=>{
    return Axios.get('/vendors');
}

//vendorApprove
export const VendorApprove = async(id, status)=>{
    return Axios.post(`/updateVendorStatus/${id}`, status);
}

//vendorDashboard
export const vendorDashboard = async()=>{
    return Axios.get('/vendorDashboard');
}

export const updateVendorProfile = async(data)=>{
    return Axios.put('/vendor/profile', data);
}

export const updateVendorBank = async(data)=>{
    return Axios.put('/vendor/bank', data);
}

export const changePassword = async(data)=>{
    return Axios.put('/changePassword', data);
}

//createProduct
export const createProduct = async(data)=>{
    return Axios.post('/createProduct', data);
}
//vendor Product page
export const productPage = async()=>{
    return Axios.get('/productPage' );
}

//updateProduct
export const updateProduct = async(id,data)=>{
    return Axios.put(`/updateProduct/${id}`, data);
}

//user infor
export const userInfo = async()=>{
    return Axios.get('/userInfo');
}

//update user status
export const updateUserStatus = async(id, data)=>{
    return Axios.put(`/userStatus/${id}`, data);
}

//products
// api/callApi.js

export const ProductCategory = (category, filters = {}) => {
  const params = new URLSearchParams();

  if (Array.isArray(filters.colour) && filters.colour.length > 0) {
    params.append(
      "colour",
      filters.colour.map((item) => String(item).toLowerCase()).join(",")
    );
  }

  if (Array.isArray(filters.size) && filters.size.length > 0) {
    params.append(
      "size",
      filters.size.map((item) => String(item).toLowerCase()).join(",")
    );
  }

  if (filters.inStock) params.append("inStock", true);

  return Axios.get(`/products/${category}?${params.toString()}`);
};

//deleteProducts
export const deleteProducts = async(id)=>{
    return Axios.delete(`/deleteProduct/${id}`);
}

//updateProducts
export const updateProducts = async(id, data)=>{
    return Axios.put(`/updateProduct/${id}`, data)
}

export const updateProductBlock = async(id, data)=>{
    return Axios.put(`/admin/productStatus/${id}`, data)
}

export const getAdminProducts = async()=>{
    return Axios.get('/admin/productsList');
}

// recomend
export const Products = async()=>{
    return Axios.get(`/products`);
}
//view product
export const getProduct = async(id)=>{
    return Axios.get(`/productInfo/${id}`);
}

export const addProductReview = async(id, data)=>{
    return Axios.post(`/productReview/${id}`, data);
}

//related products
export const relatedProducts = async(category)=>{
    return Axios.get(`/relatedProducts/${category}`);
}

//add to cart
export const addToCart = async(productId)=>{
    return Axios.post(`/addToCart`,productId);
}

//view cart
export const viewCart = async()=>{
    return Axios.get(`/viewCart`);
}
// quantity cart
export const quantityCart = async(id,data)=>{
    return Axios.post(`/quantity/${id}`, data);
}
//search bar
export const searchBar = async(query)=>{
    return Axios.get(`/search?query=${query}`);
}
//top trends 
export const allTopTrends = async(category)=>{
    return Axios.get(`/products/${category}`);
}

//useDashboard
//top trends 
export const userDashboard = async()=>{
    return Axios.get(`/userDashboard`);
}
//logout
export const logout = async()=>{
    return Axios.post(`/logout`);
}
//wishlist add
export const wishlist = async(id)=>{
    return Axios.post(`/addWishlist`, id);
}
//getwishlist
export const getWishlist = async()=>{
    return Axios.get(`/getwishlist`);
}
//delete wishlist
export const deleteWishlist = async(id)=>{
    return Axios.delete(`/deleteWishlist/${id}`);
}
//delete cart
export const deleteCart = async(id)=>{
    return Axios.delete(`/deleteCart/${id}`);
}
//track recent product
export const trackProductVisit = (productId) =>
  Axios.post("/trackVisit", { productId });

//recent product

export const recentProducts = () =>
  Axios.get("/recentProducts");

export const productWishlist = async(id)=>{
    const ids = Array.isArray(id) ? id.join(",") : id;
    return Axios.get(`/productLS`, { params: { ids } });
}

export const GuestRecentProducts = async(id)=>{
    const ids = Array.isArray(id) ? id.join(",") : id;
    return Axios.get(`/productRecent`, { params: { ids } });
}

export const createOrder = async(data)=>{
    return Axios.post('/orders', data);
}

export const getOrders = async()=>{
    return Axios.get('/orders');
}

export const requestCancelOrder = async(id)=>{
    return Axios.patch(`/orders/${id}/cancel-request`);
}

export const getVendorOrders = async()=>{
    return Axios.get('/vendor/orders');
}

export const getAdminOrders = async()=>{
    return Axios.get('/admin/orders-list');
}

export const updateOrderStatus = async(id, data)=>{
    return Axios.patch(`/admin/orders/${id}`, data);
}

export const getAdminSummary = async()=>{
    return Axios.get('/admin/summary');
}
