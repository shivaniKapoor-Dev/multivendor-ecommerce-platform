import React, { useState } from "react";
import VendorSidebar from "./VendorSidebar";
import VendorTopbar from "./VendorTopbar";
import { Outlet } from "react-router-dom";

export default function VendorLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <VendorSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Topbar */}
        <VendorTopbar setIsOpen={setIsOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}