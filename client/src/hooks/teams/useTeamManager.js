import { useState, useEffect, useCallback } from "react";
import { handleGetMyTeams } from "./useTeamActions.js";
import { socket } from "../../core/socketInstance.js";

export const useTeamManager = (userId) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshTeams = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await handleGetMyTeams(userId);
      setTeams(data || []);
    } catch (err) {
      console.error("Error in refreshTeams:", err);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refreshTeams();
  }, [refreshTeams]);

  useEffect(() => {
    if (!userId) return;

    socket.on("team:created", refreshTeams);
    socket.on("team:updated", refreshTeams);
    socket.on("team:deleted", refreshTeams);

    return () => {
      socket.off("team:created", refreshTeams);
      socket.off("team:updated", refreshTeams);
      socket.off("team:deleted", refreshTeams);
    };
  }, [userId, refreshTeams]);

  return { teams, loading, refreshTeams };
};

















  

  

  



  
    
    
