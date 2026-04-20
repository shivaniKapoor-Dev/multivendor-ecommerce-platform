import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/callApi";

export default function VendorTopbar({ setIsOpen }) {
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
    <header className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
      <button
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24}/>
      </button>

      <h1 className="font-semibold text-gray-700">
        Vendor Dashboard
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>Welcome</span>
        <button
          onClick={handleLogout}
          className="font-medium text-red-600 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
