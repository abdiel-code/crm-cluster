import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { socket } from "../../core/socketInstance.js";
import { log } from "../../core/logWrapper.js";
import axios from "axios";
import { baseUrl } from "../../config.js";

//"http://localhost:3030/api/users/me"
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/users/me`, {
          withCredentials: true,
        });

        const userData = res.data.user;
        setUser(userData);

        socket.auth = { userId: userData.id };
        socket.connect();

        socket.on("connect", () => {
          log("✅ Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
          console.error("❌ Socket connection error:", err.message);
        });

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
