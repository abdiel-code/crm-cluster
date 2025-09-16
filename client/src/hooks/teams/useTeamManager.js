import { useState, useEffect, useCallback, useRef } from "react";
import {
  handleGetMyTeams,
  handleGetRequests,
  handleJoinedTeams,
} from "./useTeamActions.js";
import { socket } from "../../core/socketInstance.js";
import { log } from "../../core/logWrapper.js";
export const useTeamManager = (userId) => {
  const [teams, setTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const listenersRegistered = useRef(false);

  log("joined teams", joinedTeams);

  const refreshRequests = useCallback(async () => {
    if (!userId) return;

    log("refreshing requests called for user:", userId);

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

    log("refreshing joined teams is using userId:", userId);
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
    refreshJoinedTeams();
  }, [refreshJoinedTeams]);

  useEffect(() => {
    if (!userId || listenersRegistered.current) return;

    listenersRegistered.current = true;

    const handleTeamChange = () => refreshTeams();
    const handleRequestChange = () => {
      log("handleRequestChange is requesting refresh requests");
      refreshRequests();
    };
    const handleAccepted = () => {
      log("handleAccepted is requesting refresh requests");
      refreshTeams();
      refreshRequests();
      refreshJoinedTeams();
    };
    const handleDeclined = () => {
      log("handleDeclined is requesting refresh requests");
      refreshTeams();
      refreshRequests();
    };

    const handleLeaveTeam = () => {
      log("handleLeaveTeam is requesting refresh joined teams");
      refreshJoinedTeams();
    };

    socket.on("team:created", handleTeamChange);
    socket.on("team:updated", handleTeamChange);
    socket.on("team:deleted", handleTeamChange);
    socket.on("team:roleUpdated", handleTeamChange);

    socket.on("team:requestSent", handleRequestChange);
    socket.on("team:requests", (payload) => {
      if (!payload || payload.userId !== userId) return;
      log("✅ team:requests received for current user");
      setRequests(payload.results || []);
    });

    socket.on("team:accepted", handleAccepted);
    socket.on("team:declined", handleDeclined);

    socket.on("team:leave", handleLeaveTeam);

    return () => {
      socket.off("team:created", handleTeamChange);
      socket.off("team:updated", handleTeamChange);
      socket.off("team:deleted", handleTeamChange);
      socket.off("team:roleUpdated", handleTeamChange);

      socket.off("team:requestSent", handleRequestChange);
      socket.off("team:requests", handleRequestChange);
      socket.off("team:accepted", handleAccepted);
      socket.off("team:declined", handleDeclined);

      socket.off("team:leave", handleLeaveTeam);

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
