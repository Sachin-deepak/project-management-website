import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProjectManager from './components/ProjectManager';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import HomePage from './components/HomePage';
import StudentManager from './components/StudentManager';

function AppContent() {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  const ProtectedRoute = ({ element }) => {
    return userRole ? element : <Navigate to="/" />;
  };

  return (
    <>
      {!hideNavbar && <Navbar role={userRole} setRole={setUserRole} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setRole={setUserRole} />} />
        <Route path="/projects" element={<ProtectedRoute element={<ProjectManager role={userRole} />} />} />
        <Route path="/students" element={<ProtectedRoute element={<StudentManager role={userRole} />} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
