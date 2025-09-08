import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../core/socketInstance.js";
import { useTeam } from "../../context/TeamContext.jsx";

const DisconnectPage = () => {
  const { setActiveTeam } = useTeam();
  const navigate = useNavigate();

  useEffect(() => {
    socket.disconnect();
    localStorage.removeItem("activeTeam");
    setActiveTeam(null);

    navigate("/tasks");
  }, []);

  return null;
};

export default DisconnectPage;
