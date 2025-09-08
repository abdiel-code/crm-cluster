import { useEffect } from "react";
import { socket } from "../../core/socketInstance.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ConnectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (!socket.connected) {
      socket.auth = { userId: user.id };
      socket.connect();

      socket.on("connect", () => {
        console.log("✅ Connected to server with ID:", socket.id);
        navigate("/coop/teams");
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Connection failed:", err.message);
      });
    } else {
      console.log("⚡ Already connected:", socket.id);
      navigate("/coop/teams");
    }

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [user]);

  return null;
};

export default ConnectPage;
