import { NavLink } from 'react-router-dom';

const SideBarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full px-4 rounded-md transition cursor-pointer ${isActive ? 'bg-[#f7b1ab]' : 'hover:bg-[#f7b1ab]'
        }`
      }
    >
      <img src={icon} alt={label} className="w-10 h-10" />
      <h2>{label}</h2>
    </NavLink>
  );
};

export default SideBarItem;
