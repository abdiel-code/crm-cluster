import CoopSideBarItem from "./CoopSideBarItem.jsx";
import { FaPaw } from "react-icons/fa";

const IconExample = () => <FaPaw color="#577399" />;

const items = [
  //{ alt: "profile", label: "Profile" },
  { alt: "messages", label: "Messages" },
  { alt: "tasks", label: "Tasks" },
  //{ alt: "customers", label: "Customers" },
  //{ alt: "users", label: "Users" },
  //{ alt: "projects", label: "Projects" },
  //{ alt: "reports", label: "Reports" },
  //{ alt: "dashboard", label: "Dashboard" },
  { alt: "teams", label: "Teams" },
];

const settingItems = [
  //{ alt: "settings", label: "Settings" },
  //{ alt: "logout", label: "Logout" },
];

const CoopSideBar = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center rounded-r-md w-[15%] h-full pt-4 border-r-2 border-[#495867]">
      <div className="flex items-center gap-3 w-full px-4 pb-4">
        <img src={IconExample()} alt="logo" className="w-10 h-10" />
        <h1 className="text-xl font-bold">FOXCOON</h1>
      </div>
      {items.map((item) => (
        <CoopSideBarItem
          key={item.alt}
          icon={IconExample()}
          label={item.label}
          to={`/coop/${item.alt}`}
        />
      ))}
      <div className="h-[1px] w-[80%] bg-[#495867] my-4"></div>
      {settingItems.map((item) => (
        <CoopSideBarItem
          key={item.alt}
          icon={IconExample()}
          label={item.label}
          to={`/coop/${item.alt}`}
        />
      ))}
    </div>
  );
};

export default CoopSideBar;
