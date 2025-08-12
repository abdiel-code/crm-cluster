import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SideBar from './components/SideBar.jsx';

// Sidebar is a component that will be used to display the sidebar but it is not yet implemented
// Sidebar is tested in a page for now

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sidebar" element={<SideBar />} />
      </Routes>
    </>
  )
}

export default App
