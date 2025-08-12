import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.jsx";

const Layout = () => {
  return (

    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>

    </div>
  );

};

export default Layout;
