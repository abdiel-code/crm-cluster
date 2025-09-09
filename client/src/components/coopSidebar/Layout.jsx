import { Outlet } from "react-router-dom";
import CoopSideBar from "./CoopSideBar.jsx";
import CoopNotificationBar from "../core/CoopNotificationBar.jsx";
import { useState } from "react";

const CoopLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="flex h-screen relative">
      <CoopNotificationBar />
      <CoopSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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

export default CoopLayout;
