import { useState } from "react";
import Sidebar from "./AdminSideBar";
import Topbar from "./AdminTopBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar setMobileOpen={setMobileOpen} />

        <main className="p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}