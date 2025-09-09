import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.jsx";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen relative">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-6 overflow-auto">
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-[#577399] text-white px-3 py-2 rounded-md"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
