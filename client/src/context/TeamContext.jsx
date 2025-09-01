import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../core/socketInstance.js";

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [activeTeam, setActiveTeam] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("activeTeam");
    if (saved) setActiveTeam(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleConnectTeam = (data) => {
      if (data.success && data.data?.[0]) {
        const team = data.data[0];
        setActiveTeam(team);
        localStorage.setItem("activeTeam", JSON.stringify(team));
        console.log("✅ Team connected successfully:", team);
      }
    };

    socket.on("team:connectTeam", handleConnectTeam);

    return () => {
      socket.off("team:connectTeam", handleConnectTeam);
    };
  }, []);

  return (
    <TeamContext.Provider value={{ activeTeam, setActiveTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
