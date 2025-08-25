import { useRef, useEffect, useState } from "react";
import formatDate from "../../hooks/global/formatDate.js";
import { motion, AnimatePresence } from "framer-motion";

const MyTeamsChart = ({ team, handleJoinRequest }) => {
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
      <div className="w-full h-full flex items-center justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-2">
        <div className="w-[4px] h-[100%] bg-[#577399] rounded-2xl"></div>
        <h1 className="font-medium text-xl">{name}</h1>
        <h1 className="text-xl">{description}</h1>
        <h1 className="text-xl text-gray-600">{formattedDate}</h1>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="bg-[#BDD5EA] text-[#495867] px-3 py-1 rounded-md hover:bg-[#AFCDE7] font-medium"
            onClick={() => handleJoinRequest(id)}
          >
            Send Join Request
          </button>

          <div className="relative">
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
