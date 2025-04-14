// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ role, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="bg-red-700 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold tracking-wide">PDC Portal</h1>
        <div className="space-x-4 flex items-center">
          {role && (
            <>
              <Link to="/projects" className="hover:text-yellow-300">Projects</Link>
              {role === 'admin' && (
                <Link to="/students" className="hover:text-yellow-300">Students</Link>
              )}
            </>
          )}

          {role ? (
            <button
              onClick={handleLogout}
              className="ml-4 bg-white text-red-700 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-red-700 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
