import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShoppingCart, BarChart, Settings, Logs, X } from "lucide-react";

export default function AdminSideBar({ mobileOpen, setMobileOpen }) {
  const menu = [
    { name: "Dashboard", path: "/adminDashboard", icon: <LayoutDashboard size={18}/> },
    { name: "Vendors", path: "/admin/vendors", icon: <Users size={18}/> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} />},
    { name: "Products", path: "/admin/products", icon: <Package size={18}/> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18}/> },
    { name: "Analytics", path: "/admin/analytics", icon: <BarChart size={18} /> },
    { name: "Settings", path:"/admin/settings", icon: <Settings size={18} />},
    { name: "Admin Logs", path:"/admin/logs", icon: <Logs size={18} />},
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg p-4 transition-transform duration-300 transform
        lg:relative lg:translate-x-0 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)} 
              className={({ isActive }) => `
                flex items-center gap-3 p-3 rounded-lg transition-colors
                ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
