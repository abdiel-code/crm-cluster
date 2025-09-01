import formatDate from "../../hooks/global/formatDate.js";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import UserChart from "./UserChart.jsx";
import useModal from "../../hooks/teams/modalHook.js";
import DeleteModal from "./DeleteModal.jsx";
import { socket } from "../../core/socketInstance.js";

const JoinedTeamChart = ({
  team,
  handleGetTeamMembers,
  handleLeaveTeam,
  refreshTeams,
  handleTeamConnect,
}) => {
  const { team_id, name, description, joined_at, role, user_id } = team;

  const [showMenu, setShowMenu] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [deleteModal, toggleDeleteModal] = useModal();

  console.log("members", members);

  const formattedDate = formatDate(joined_at);

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(team_id);
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
    if (!team_id) return;
    const fetchMembers = async () => {
      try {
        const data = await handleGetTeamMembers(team_id);
        setMembers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, [team_id]);

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
    <div className="w-full h-full flex flex-col gap-3 items-end relative">
      <div className="w-full h-full flex items-center justify-around rounded-[10px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.20)] py-2">
        <div className="w-[4px] h-[100%] bg-[#577399] rounded-2xl"></div>
        <h1 className="font-medium text-xl">{name}</h1>
        <h1 className="text-xl">{description}</h1>
        <h1 className="text-xl text-gray-600">{formattedDate}</h1>
        <h1 className="text-xl">
          {role ? role[0].toUpperCase() + role.slice(1).toLowerCase() : ""}
        </h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="bg-[#F7B1AB] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#FF847E] text-white py-1 px-2"
            onClick={toggleDeleteModal}
          >
            Leave
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
              onClick={() => handleTeamConnect(team)}
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
        <div className="absolute top-full left-0 w-full bg-white rounded-lg  z-50 p-4 flex flex-col gap-2 border-2 border-[#577399]">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <UserChart user={member} formatDate={formatDate} />
            </motion.div>
          ))}
        </div>
      )}

      {deleteModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
          <DeleteModal
            id={team_id}
            userId={user_id}
            toggleDeleteModal={toggleDeleteModal}
            handleDeleteFunction={handleLeaveTeam}
            message="Are you sure you want to leave?"
            refreshTeams={refreshTeams}
          />
        </div>
      )}
    </div>
  );
};

export default JoinedTeamChart;
