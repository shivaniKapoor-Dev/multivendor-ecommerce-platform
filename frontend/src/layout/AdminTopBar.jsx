import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/callApi";

export default function AdminTopBar({ setMobileOpen }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      await logout();
      navigate("/authPage");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-white shadow px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-yellow-700">TheLuvia</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden sm:inline font-semibold text-blue-800">Admin</span>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Logout
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs">
          A
        </div>
      </div>
    </div>
  );
}
