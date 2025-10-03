import { forwardRef } from 'react';
import SideBarItem from './SideBarItem.jsx';
import {
  FaEnvelope,
  FaTasks,
  FaUsers,
  FaPaw,
  FaUsersCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaCog,
} from 'react-icons/fa';

const iconMap = {
  messages: <FaEnvelope color="#577399" />,
  tasks: <FaTasks color="#577399" />,
  users: <FaUsers color="#577399" />,
  teams: <FaUsersCog color="#577399" />,
  disconnect: <FaSignOutAlt color="#577399" />,
  connect: <FaSignInAlt color="#577399" />,
  settings: <FaCog color="#577399" />,
};

const items = [{ alt: 'tasks', label: 'Tasks' }];

const settingItems = [{ alt: 'connect', label: 'Connect' }];

const SideBar = forwardRef(({ isOpen, toggleSidebar }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[70%] sm:w-[15%] sm:static sm:translate-x-0 border-r-2 border-[#495867] flex flex-col gap-4 justify-center items-center pt-4 rounded-r-md`}
    >
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
});

SideBar.displayName = 'SideBar';

export default SideBar;
