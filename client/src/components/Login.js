import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setRole }) {
  const navigate = useNavigate();
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = () => {
    if (username === 'Admin' && password === 'admin@kitpdc') {
      setRole('admin');
      localStorage.setItem('userRole', 'admin');
      navigate('/projects');
    } else {
      alert('Invalid admin credentials ❌');
    }
  };

  const handleGuestLogin = () => {
    setRole('guest');
    localStorage.setItem('userRole', 'guest');
    navigate('/projects');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100 px-4">

      {!showAdminForm ? (
        <>
          <button
            onClick={() => setShowAdminForm(true)}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-900"
          >
            Admin
          </button>

          <button
            onClick={handleGuestLogin}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
          >
            Student
          </button>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              onClick={handleAdminLogin}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Login
            </button>
            <button
              onClick={() => setShowAdminForm(false)}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
