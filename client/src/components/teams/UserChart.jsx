import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const UserChart = ({ user, formatDate }) => {
  const { user_id, role, joined_at, name } = user;
  const formattedDate = formatDate(joined_at);

  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user_id);
    setShowMenu(false);
  };
  return (
    <div className="w-[100%] h-[100%] flex flex-col sm:flex sm:flex-row sm:items-center items-center justify-center sm:justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-2 relative">
      <FaUserCircle size={30} color="#577399" />
      <h1 className="font-medium text-xl">{name}</h1>
      <h1 className="text-xl">
        {role ? role[0].toUpperCase() + role.slice(1).toLowerCase() : ""}
      </h1>
      <h1 className="text-xl text-gray-600 text-center sm:text-left">
        Joined at: {formattedDate}
      </h1>
      <button
        ref={buttonRef}
        type="button"
        className="w-[30px] h-[30px] flex items-center justify-center text-[#495867] hover:text-[#577399] text-3xl cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <div className="leading-none relative bottom-[25%]">...</div>
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[45px] right-0 bg-white shadow-md rounded-md p-2 z-10 flex flex-col gap-2 text-sm min-w-[100px] whitespace-nowrap"
          >
            <button
              onClick={handleCopyId}
              className="text-left hover:bg-[#BDD5EA] cursor-pointer text-lg"
            >
              Copy ID
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserChart;
