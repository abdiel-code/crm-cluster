import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import Layout from './components/Layout.jsx';


// Sidebar is a component that will be used to display the sidebar but it is not yet implemented
// Sidebar is tested in a page for now

function App() {

  return (
    <>
      <Routes>
        {/*Public routes*/}
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/*Private routes with layout*/}
        <Route element={<Layout />}>
          {/*Routes*/}
        </Route>

      </Routes>
    </>
  )
}

export default App
