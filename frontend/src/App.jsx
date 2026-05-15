import AdminDashboard from './admin/AdminDashboard'
import './App.css'
import AuthPage from './components/AuthPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Landing from './pages/Landing'
import {  Route, Routes } from 'react-router-dom'
import VendorDashboard from './vendor/VendorDashboard'
import UserDashboard from './user/UserDashboard'
import AdminLayout from './layout/AdminLayout'
import HomeAccount from './Account/HomeAccount'
import VendorLayout from './layout/VendorLayout'
import VendorsApproval from './admin/VendorsApproval'
import ProductsApproval from './admin/ProductsApproval'
import AdminUsers from './admin/AdminUsers'
import AdminAnalytics from './admin/AdminAnalytics'
import AdminLogs from './admin/AdminLogs'
import AdminSettings from './admin/AdminSettings'
import AdminTrackOrders from './admin/AdminTrackOrders'
import AuthPageVendor from './components/AuthPageVendor'
import CreateProduct from './vendor/CreateProduct'
import ProductPage from './vendor/ProductPage'
import VendorOrders from './vendor/VendorOrders'
import VendorStoreProfile from './vendor/VendorStoreProfile'
import VendorPayments from './vendor/VendorPayments'
import VendorSettings from './vendor/VendorSettings'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ShowingAllProducts from './pages/ShowingAllProducts'
import UserLayout from './layout/UserLayout'
import SubTopTrendsPage from './components/SubTopTrendsPage'
import ManageProfile from './user/ManageProfile'
import WishList from './Account/WishList'
import OrdersReturns from './components/OrdersReturns'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import CustomerCare from './pages/CustomerCare'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
  <Routes>
<Route  element={<UserLayout />} >
    <Route path='/' element={<Landing />} />
    <Route path='/authPage' element={<AuthPage />} />
    <Route path='/cart' element={<Cart />} /> 
    <Route path='/registerVendor' element={<AuthPageVendor />} />
    <Route path='/productDetail/:id' element={<ProductDetails />} />
    <Route path='/products' element={<ProductList />} />
     <Route path='/allProducts' element={<ShowingAllProducts />} />
     <Route path='/trends' element={<SubTopTrendsPage />} />
    <Route path='/about' element={<AboutUs />} />
    <Route path='/contact' element={<ContactUs />} />
    <Route path='/customer-care' element={<CustomerCare />} />

    <Route element={<ProtectedRoute allowedRoles={['user']} />}>
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/account' element={<HomeAccount />} />
      <Route path='/userAccount' element={<ManageProfile />} />
      <Route path='/wishlist' element={<WishList />} />
      <Route path='/orders' element={<OrdersReturns />} />
      <Route path='/userDashboard' element={<UserDashboard />} />
    </Route>
     </Route>

    {/* Admin */}
    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
    <Route element={<AdminLayout />}>
      <Route path='/adminDashboard' element={<AdminDashboard />} />
      <Route path='/admin/vendors' element={<VendorsApproval />} />
      <Route path='/admin/orders' element={<AdminTrackOrders />} />
      <Route path='/admin/products' element={<ProductsApproval />} />
      <Route path='/admin/users' element={<AdminUsers />} />
      <Route path='/admin/analytics' element={<AdminAnalytics />} />
      <Route path='/admin/logs' element={<AdminLogs />} />
      <Route path='/admin/settings' element={<AdminSettings />} />
    </Route>
    </Route>

    {/* vendor */}
    <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
      <Route element={<VendorLayout />}>
        <Route path='/vendorDashboard' element={<VendorDashboard />} />
        <Route path='/vendor/orders' element={<VendorOrders />} />
        <Route path='/vendor/products' element={<ProductPage />} />
        <Route path='/vendor/storeProfile' element={<VendorStoreProfile />} />
        <Route path='/vendor/payments' element={<VendorPayments />} />
        <Route path='/vendor/settings' element={<VendorSettings />} />
        <Route path='/vendor/Create/Products' element={<CreateProduct />} />
      </Route>
    </Route>

  </Routes>
    </>
  )
}

export default App
