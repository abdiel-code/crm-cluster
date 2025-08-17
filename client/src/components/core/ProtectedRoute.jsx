import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3030/api/users/me", { withCredentials: true });
        setIsAuthenticated(!!res.data);
        setUser(res.data.user);

      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

}

export default ProtectedRoute
