import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Package, Heart, Sparkles, RotateCcw, User2Icon,
  CreditCard, Store, Library, LogOut, ChevronRight 
} from "lucide-react";
import { logout } from "../api/callApi";

export default function HomeAccount() {
  const navigate=useNavigate();
  const [loading, setLoading] = React.useState(false);


  const handleLogout = async()=>{
    if (loading) return;

  try {
    setLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    await logout();
    navigate("/authPage");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};



  const accountLinks = [
    { name: "Your Orders", path: "/orders", desc: "Track, return, or buy things again", icon: <Package size={24} /> },
    { name: "Your Account", path: "/userAccount", desc: "Your account details", icon: <User2Icon size={24} /> },

    { name: "Your Wish List", path: "/wishlist", desc: "Items you've saved for later", icon: <Heart size={24} /> },
    { name: "Recommendations", path: "#", desc: "Based on your recent activity", icon: <Sparkles size={24} /> },
    { name: "Returns", path: "#", desc: "View status of current returns", icon: <RotateCcw size={24} /> },
    { name: "Subscriptions", path: "#", desc: "Manage payments and renewals", icon: <CreditCard size={24} /> },
    { name: "Seller Account", path: "#", desc: "Manage your storefront and sales", icon: <Store size={24} /> },
    { name: "Content Library", path: "#", desc: "Digital purchases and downloads", icon: <Library size={24} /> },
    { name: "Sign out", action: "logout", desc: "Securely leave your account", icon: <LogOut size={24} /> },
  ];

  return (
    <>  
    <div className="mt-6 text-xs font-bold uppercase text-slate-400 group-hover:text-red-600">
</div>
    
      <div className="min-h-screen bg-[#F8FAFC] py-16 px-6 font-sans">
        
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Account Settings
          </h1>
          <p className="mt-2 text-slate-500 text-lg">
            Manage your profile, orders, and preferences.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {accountLinks.map((item, index) => (
  item.action === "logout" ? (
    <div
      key={index}
      onClick={handleLogout}
      className="group cursor-pointer relative flex flex-col justify-between bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-200"
    >
      <div>
        <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
          {item.icon}
        </div>

        <h2 className="text-lg font-bold text-slate-800 group-hover:text-red-600 transition-colors">
          {item.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {item.desc}
        </p>
      </div>

      <div className="mt-6 text-xs font-bold uppercase text-slate-400 group-hover:text-red-600">
        Logout
      </div>
    </div>
  ) : (
    <Link
      key={index}
      to={item.path}
      className="group relative flex flex-col justify-between bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
    >
      {/* same as your existing UI */}
      <div>
        <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {item.icon}
        </div>

        <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600">
          {item.name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {item.desc}
        </p>
      </div>

      <div className="mt-6 text-xs font-bold text-slate-400 group-hover:text-blue-600">
        Manage Details
      </div>
    </Link>
  )
))}
        </div>

      </div>
    </div>
    </>

  );
}