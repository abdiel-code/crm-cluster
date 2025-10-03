import { Outlet } from 'react-router-dom';
import CoopSideBar from './CoopSideBar.jsx';
import CoopNotificationBar from '../core/CoopNotificationBar.jsx';
import { useState, useEffect, useRef } from 'react';

const CoopLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isMobile = window.innerWidth < 640;

      if (
        isMobile &&
        isSidebarOpen &&
        sidebarRef.current &&
        buttonRef.current
      ) {
        if (
          !sidebarRef.current.contains(e.target) &&
          !buttonRef.current.contains(e.target)
        ) {
          toggleSidebar();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen relative">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40 sm:hidden" />
      )}
      <CoopNotificationBar />
      <CoopSideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        ref={sidebarRef}
      />
      <main className="flex-1 p-6 overflow-auto">
        <button
          className="sm:hidden fixed top-4 left-4 z-50 bg-[#577399] text-white px-3 py-2 rounded-md"
          onClick={toggleSidebar}
          ref={buttonRef}
        >
          ☰
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default CoopLayout;
