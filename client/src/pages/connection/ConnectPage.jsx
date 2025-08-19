import { useAuth } from "../../context/AuthContext.jsx";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const ConnectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConnect = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const socket = io("http://localhost:3030", {
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("✅ Connected to server with ID:", socket.id);
        navigate("/coop");
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Connection failed:", err.message);
      });
    } catch (error) {
      console.error("Error connecting to the server:", error);
    }
  };

  return (
    <div>
      <h1>Connection page</h1>
      <button onClick={handleConnect} className="border-2 border-black">
        Connect
      </button>
    </div>
  );
};

export default ConnectPage;
