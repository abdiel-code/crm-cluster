import { useState, useEffect, useCallback } from "react";

import { handleGetMyTeams, handleGetRequests } from "./useTeamActions.js";

import { socket } from "../../core/socketInstance.js";

export const useTeamManager = (userId) => {
  const [teams, setTeams] = useState([]);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(false);

  const refreshRequests = useCallback(async () => {
    if (!userId) return;

    try {
      const data = await handleGetRequests(userId);
      setRequests(data || []);
    } catch (error) {
      console.error("Error in refreshTeams:", error);
      setRequests([]);
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

  useEffect(() => {
    if (!userId) return;

    socket.on("team:requestSent", refreshRequests);
    socket.on("team:requests", refreshRequests);
    socket.on("team:accepted", refreshTeams, refreshRequests);
    socket.on("team:declined", refreshTeams, refreshRequests);

    return () => {
      socket.off("team:requestSent", refreshRequests);
      socket.off("team:requests", refreshRequests);
    };
  }, [userId, refreshRequests]);

  return { teams, requests, loading, refreshTeams, refreshRequests };
};
