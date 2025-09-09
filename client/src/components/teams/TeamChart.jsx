import { useRef, useEffect, useState } from "react";
import formatDate from "../../hooks/global/formatDate.js";
import { motion, AnimatePresence } from "framer-motion";

const MyTeamsChart = ({ team, userId, handleJoinRequest }) => {
  const { id, name, description, created_at } = team;
  const [showMenu, setShowMenu] = useState(false);

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const formattedDate = formatDate(created_at);

  const handleCopyId = () => {
    navigator.clipboard.writeText(id);
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4 rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-4 px-4">
        <div className="hidden sm:block w-[4px] h-full bg-[#577399] rounded-2xl"></div>

        <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-around sm:text-left sm:flex-1 gap-2 sm:gap-4">
          <h1 className="font-medium text-xl break-words">{name}</h1>
          <h1 className="text-xl break-words">{description}</h1>
          <h1 className="text-xl text-gray-600">{formattedDate}</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="bg-[#BDD5EA] text-[#495867] px-3 py-1 rounded-md hover:bg-[#AFCDE7] font-medium cursor-pointer w-full sm:w-auto"
            onClick={() => handleJoinRequest(id, userId)}
          >
            Send Join Request
          </button>

          <div className="relative w-full sm:w-auto flex justify-center sm:justify-start">
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
                  className="absolute top-[35px] right-0 bg-white shadow-md rounded-md p-2 z-10 flex flex-col gap-2 text-sm min-w-[100px] whitespace-nowrap"
                >
                  <button
                    onClick={handleCopyId}
                    className="text-left hover:bg-[#BDD5EA] cursor-pointer text-lg"
                  >
                    Copy ID 📋
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeamsChart;
