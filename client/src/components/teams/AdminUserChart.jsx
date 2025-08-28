import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import useModal from "../../hooks/teams/modalHook";
import DeleteTeamModal from "./DeleteTeamModal";

const AdminUserChart = ({ user, formatDate, onEdit, onDelete }) => {
  const { user_id, role, joined_at, name } = user;
  const formattedDate = formatDate(joined_at);

  const [showMenu, setShowMenu] = useState(false);
  const [deleteModal, toggleDeleteModal] = useModal();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user_id);
    setShowMenu(false);
  };

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-2 relative">
      <FaUserCircle size={30} color="#577399" />
      <h1 className="font-medium text-xl">{name}</h1>
      <h1 className="text-xl">{role}</h1>
      <h1 className="text-xl text-gray-600">Joined at: {formattedDate}</h1>

      <button
        type="button"
        onClick={() => onDelete(user_id)}
        className="bg-[#F7B1AB] w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF847E]"
      >
        <div className="w-[80%] h-1 bg-white rounded-full"></div>
      </button>

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
              onClick={() => {
                onEdit(user_id);
                setShowMenu(false);
              }}
              className="text-left hover:bg-[#BDD5EA] cursor-pointer text-lg"
            >
              Edit
            </button>
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

export default AdminUserChart;
