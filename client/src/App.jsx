import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import Layout from './components/sidebar/Layout.jsx';
import CoopLayout from './components/coopSidebar/Layout.jsx';
import ProtectedRoute from './components/core/ProtectedRoute.jsx';
import TaskPage from './pages/tasks/TaskManager.jsx';
import ConnectPage from './pages/connection/ConnectPage.jsx';
import CoopTaskManager from './pages/coopTasks/CoopTaskManager.jsx';
import TeamManager from './pages/teams/TeamManager.jsx';
import MessageManager from './pages/messages/MessageManager.jsx';
import { BarSignalProvider } from './context/BarSignalContext.jsx';
import DisconnectPage from './pages/connection/DisconnectPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import AboutPage from './pages/connection/useTeamCleanup.js';

function App() {
  const colors = {
    darkBlue: '#495867',
    blue: '#577399',
    softBlue: '#BDD5EA',
    white: '#F7F7FF',
    softRed: '#F7B1AB',
  };

  return (
    <div className="bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffffff_65%,_#bdd5ea_90%,_#bdd5ea_100%)] min-h-screen w-full">
      <Routes>
        {/*Public routes*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
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

          {/*Coop routes*/}
          <Route
            element={
              <BarSignalProvider>
                <CoopLayout />
              </BarSignalProvider>
            }
          >
            <Route path="/coop" element={<div>Coop</div>} />
            <Route path="/coop/tasks" element={<CoopTaskManager />} />
            <Route path="/coop/teams" element={<TeamManager />} />
            <Route path="/coop/messages" element={<MessageManager />} />
            <Route path="/coop/disconnect" element={<DisconnectPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
