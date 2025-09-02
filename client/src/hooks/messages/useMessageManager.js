import { useState, useEffect, useCallback, useRef } from "react";
import { socket } from "../../core/socketInstance.js";
import { useTeam } from "../../context/TeamContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const useMessageManager = () => {
  const { activeTeam: team } = useTeam();
  const { user } = useAuth();

  const listenersRegistered = useRef(false);
  const [messages, setMessages] = useState([]);

  const refreshMessages = useCallback((newMessages) => {
    setMessages(newMessages || []);
  }, []);

  const sendMessage = (message) => {
    if (!team?.team_id) return;
    socket.emit("team:sendMessage", { ...message, teamId: team.team_id });
    setMessages((prev) => [...prev, { ...message, teamId: team.team_id }]);
  };

  useEffect(() => {
    if (!team?.team_id) return;
    if (listenersRegistered.current) return;

    listenersRegistered.current = true;

    const handleNewMessage = (response) => {
      const message = response.data;
      if (message.teamId !== team.team_id) return;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("team:receiveMessage", handleNewMessage);

    return () => {
      socket.off("team:receiveMessage", handleNewMessage);
      listenersRegistered.current = false;
    };
  }, [team?.team_id]);

  return {
    messages,
    refreshMessages,
    setMessages,
  };
};

export default useMessageManager;
