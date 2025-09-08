import { NavLink } from "react-router-dom";

const CoopSideBarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full px-4 rounded-md transition cursor-pointer ${
          isActive ? "bg-[#BDD5EA]" : "hover:bg-[#BDD5EA]"
        }`
      }
    >
      <div className="text-xl">{icon}</div>
      <h2 className="text-md font-medium">{label}</h2>
    </NavLink>
  );
};

export default CoopSideBarItem;
