import { connect } from "socket.io-client";
import SideBarItem from "./SideBarItem.jsx";
import {
  FaEnvelope,
  FaTasks,
  FaUsers,
  FaPaw,
  FaUsersCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaCog,
} from "react-icons/fa";

const iconMap = {
  messages: <FaEnvelope color="#577399" />,
  tasks: <FaTasks color="#577399" />,
  users: <FaUsers color="#577399" />,
  teams: <FaUsersCog color="#577399" />,
  disconnect: <FaSignOutAlt color="#577399" />,
  connect: <FaSignInAlt color="#577399" />,
  settings: <FaCog color="#577399" />,
};

const items = [
  //{ alt: "profile", label: "Profile" },
  { alt: "tasks", label: "Tasks" },
  //{ alt: "customers", label: "Customers" },
  //{ alt: "users", label: "Users" },
  //{ alt: "projects", label: "Projects" },
  //{ alt: "reports", label: "Reports" },
  //{ alt: "dashboard", label: "Dashboard" },
];

const settingItems = [
  { alt: "connect", label: "Connect" },
  //{ alt: "settings", label: "Settings" },
  //{ alt: "logout", label: "Logout" },
];

const SideBar = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center rounded-r-md w-[15%] h-full pt-4 border-r-2 border-[#495867]">
      <div className="flex items-center gap-3 w-full px-4 pb-4">
        <FaPaw color="#577399" className="w-10 h-10" />
        <h1 className="text-xl font-bold">FOXCOON</h1>
      </div>
      {items.map((item) => (
        <SideBarItem
          key={item.alt}
          icon={iconMap[item.alt]}
          label={item.label}
          to={`/${item.alt}`}
        />
      ))}
      <div className="h-[1px] w-[80%] bg-[#495867] my-4"></div>
      {settingItems.map((item) => (
        <SideBarItem
          key={item.alt}
          icon={iconMap[item.alt]}
          label={item.label}
          to={`/${item.alt}`}
        />
      ))}
    </div>
  );
};

export default SideBar;
