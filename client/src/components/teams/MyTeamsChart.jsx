import formatDate from "../../hooks/global/formatDate.js";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import AdminUserChart from "./AdminUserChart.jsx";
import { socket } from "../../core/socketInstance.js";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../../context/TeamContext.jsx";

const MyTeamsChart = ({
  team,
  toggleDeleteModal,
  handleGetTeamMembers,
  toggleUpdateModal,
  handleDeleteMember,
  handleUpdateRole,
  handleTeamConnect,
}) => {
  const { setActiveTeam } = useTeam();
  const { id, name, description, created_at } = team;
  const [showMenu, setShowMenu] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const formattedDate = formatDate(created_at);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!team?.id) return;
    const fetchMembers = async () => {
      try {
        const data = await handleGetTeamMembers(team.id);
        setMembers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, [team.id]);

  useEffect(() => {
    if (!team?.id) return;
    const handleRoleUpdated = (updatedUser) => {
      if (updatedUser.team_id === team.id) {
        setMembers((prevMembers) =>
          prevMembers.map((m) =>
            m.user_id === updatedUser.user_id
              ? { ...m, role: updatedUser.role }
              : m
          )
        );
      }
    };

    socket.on("team:roleUpdated", handleRoleUpdated);

    return () => {
      socket.off("team:roleUpdated", handleRoleUpdated);
    };
  }, [team.id]);

  return (
    <div className="w-full h-full flex flex-col gap-3 items-end relative group">
      <div className="w-full h-full flex items-center justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-2">
        <div className="w-[4px] h-[100%] bg-[#577399] rounded-2xl"></div>
        <h1 className="font-medium text-xl">{name}</h1>
        <h1 className="text-xl">{description}</h1>
        <h1 className="text-xl text-gray-600">{formattedDate}</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="bg-[#F7B1AB] w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#FF847E]"
            onClick={() => toggleDeleteModal(id)}
          >
            <div className="w-[80%] h-1 bg-white rounded-full"></div>
          </button>

          <motion.div
            animate={{ rotate: showMembers ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className="text-[#495867] hover:text-[#577399] cursor-pointer"
              onClick={() => setShowMembers((prev) => !prev)}
            >
              <FaChevronDown size={25} />
            </button>
          </motion.div>

          <div className="absolute top-[-50%] right-[50%] opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button
              onClick={() => {
                console.log("handleTeamConnect team_id", team.id);
                handleTeamConnect(team.id, setActiveTeam).then(() => {
                  navigate(`/coop/messages`);
                });
              }}
              className="bg-[#BDD5EA] text-[#495867] px-3 py-1 rounded-md shadow-md hover:bg-[#577399] font-semibold cursor-pointer"
            >
              Connect to this team
            </button>
          </div>

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
                    onClick={() => {
                      toggleUpdateModal(id);
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
        </div>
      </div>

      {showMembers && (
        <div className="absolute top-full left-0 w-full bg-white rounded-lg z-60 p-4 flex flex-col gap-2 border-2 border-[#577399]">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdminUserChart
                user={member}
                formatDate={formatDate}
                onRoleUpdate={handleUpdateRole}
                onDelete={handleDeleteMember}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeamsChart;
