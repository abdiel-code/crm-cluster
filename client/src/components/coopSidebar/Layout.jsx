import { Outlet } from "react-router-dom";
import CoopSideBar from "./CoopSideBar.jsx";
import CoopNotificationBar from "../core/CoopNotificationBar.jsx";

const CoopLayout = () => {
  return (
    <div className="flex h-screen">
      <CoopNotificationBar />
      <CoopSideBar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CoopLayout;
