import { useState, useEffect, useCallback, useRef } from "react";
import {
  handleGetMyTeams,
  handleGetRequests,
  handleJoinedTeams,
} from "./useTeamActions.js";
import { socket } from "../../core/socketInstance.js";

export const useTeamManager = (userId) => {
  const [teams, setTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const listenersRegistered = useRef(false);

  const refreshRequests = useCallback(async () => {
    if (!userId) return;

    console.log("refreshing requests called for user:", userId);

    try {
      const data = await handleGetRequests(userId);
      setRequests(data || []);
    } catch (error) {
      console.error("Error in refreshRequests:", error);
      setRequests([]);
    }
  }, [userId]);

  const refreshJoinedTeams = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await handleJoinedTeams(userId);
      setJoinedTeams(data || []);
    } catch (error) {
      console.error("Error in refreshJoinedTeams:", error);
      setJoinedTeams([]);
    }
  }, [userId]);

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
    refreshRequests();
  }, [refreshRequests]);

  useEffect(() => {
    if (!userId || listenersRegistered.current) return;

    listenersRegistered.current = true;

    const handleTeamChange = () => refreshTeams();
    const handleRequestChange = () => {
      console.log("handleRequestChange is requesting refresh requests");
      refreshRequests();
    };
    const handleAccepted = () => {
      console.log("handleAccepted is requesting refresh requests");
      refreshTeams();
      refreshRequests();
    };
    const handleDeclined = () => {
      console.log("handleDeclined is requesting refresh requests");
      refreshTeams();
      refreshRequests();
    };

    socket.on("team:created", handleTeamChange);
    socket.on("team:updated", handleTeamChange);
    socket.on("team:deleted", handleTeamChange);
    socket.on("team:roleUpdated", handleTeamChange);

    socket.on("team:requestSent", handleRequestChange);
    socket.on("team:requests", (payload) => {
      if (!payload || payload.userId !== userId) return;
      console.log("✅ team:requests received for current user");
      setRequests(payload.results || []);
    });

    socket.on("team:accepted", handleAccepted);
    socket.on("team:declined", handleDeclined);

    return () => {
      socket.off("team:created", handleTeamChange);
      socket.off("team:updated", handleTeamChange);
      socket.off("team:deleted", handleTeamChange);
      socket.off("team:roleUpdated", handleTeamChange);

      socket.off("team:requestSent", handleRequestChange);
      socket.off("team:requests", handleRequestChange);
      socket.off("team:accepted", handleAccepted);
      socket.off("team:declined", handleDeclined);

      listenersRegistered.current = false;
    };
  }, [userId, refreshRequests, refreshTeams]);

  return {
    teams,
    joinedTeams,
    requests,
    loading,
    refreshTeams,
    refreshRequests,
    refreshJoinedTeams,
  };
};
