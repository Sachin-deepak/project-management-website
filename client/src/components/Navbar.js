import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold tracking-wide">PDC Portal</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300">Submit</Link>
          <Link to="/projects" className="hover:text-yellow-300">Projects</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
