import { socket } from "../../core/socketInstance.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ConnectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleConnect = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    if (!socket.connected) {
      socket.auth = { userId: user.id };
      socket.connect();

      socket.on("connect", () => {
        console.log("✅ Connected to server with ID:", socket.id);
        navigate("/coop");
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Connection failed:", err.message);
      });
    } else {
      console.log("⚡ Already connected:", socket.id);
      navigate("/coop");
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
