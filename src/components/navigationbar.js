// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">AI Voice Agent</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
