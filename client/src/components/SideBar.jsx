const SideBar = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center rounded-r-md w-[15%] h-full pt-4 border-r-2 border-[#495867]">
      <div className="flex items-center gap-3 w-full px-4 pb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="logo"
          className="w-10 h-10"
        />
        <h1 className="text-xl font-bold">FOXCOON</h1>
      </div>
      {[
        { alt: "profile", label: "Profile" },
        { alt: "tasks", label: "Tasks" },
        { alt: "customers", label: "Customers" },
        { alt: "users", label: "Users" },
        { alt: "projects", label: "Projects" },
        { alt: "reports", label: "Reports" },
        { alt: "dashboard", label: "Dashboard" },
      ].map(({ alt, label }) => (
        <div key={label} className="flex items-center gap-3 w-full px-4 cursor-pointer hover:bg-[#f7b1ab] rounded-md transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt={alt}
            className="w-10 h-10"
          />
          <h2>{label}</h2>
        </div>
      ))}
      <div className="h-[1px] w-[80%] bg-[#495867] my-4"></div>


      {
        [
          { alt: "settings", label: "Settings" },
          { alt: "logout", label: "Logout" },
        ].map(({ alt, label }) => (
          <div key={label} className="flex items-center gap-3 w-full px-4 cursor-pointer hover:bg-[#f7b1ab] rounded-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt={alt}
              className="w-10 h-10"
            />
            <h2>{label}</h2>
          </div>

        ))
      }
    </div>
  );
};

export default SideBar;
