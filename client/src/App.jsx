import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import Layout from "./components/sidebar/Layout.jsx";
import CoopLayout from "./components/coopSidebar/Layout.jsx";
import ProtectedRoute from "./components/core/ProtectedRoute.jsx";
import TaskPage from "./pages/tasks/TaskManager.jsx";
import ConnectPage from "./pages/connection/ConnectPage.jsx";
import CoopTaskManager from "./pages/coopTasks/CoopTaskManager.jsx";
import TeamManager from "./pages/teams/TeamManager.jsx";

// Sidebar is a component that will be used to display the sidebar but it is not yet implemented
// Sidebar is tested in a page for now

function App() {
  const colors = {
    darkBlue: "#495867",
    blue: "#577399",
    softBlue: "#BDD5EA",
    white: "#F7F7FF",
    softRed: "#F7B1AB",
  };

  console.log("colors", colors);
  return (
    <>
      <Routes>
        {/*Public routes*/}
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*Task to test*/}

        {/*Private routes with layout*/}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            {/*Routes*/}
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Route>

          <Route element={<CoopLayout />}>
            <Route path="/coop" element={<div>Coop</div>} />
            <Route path="/coop/tasks" element={<CoopTaskManager />} />
            <Route path="/coop/teams" element={<TeamManager />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
