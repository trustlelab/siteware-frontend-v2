// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaCog, FaUsers, FaLayerGroup, FaListAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // State for accordion

  return (
    <div className="bg-[#060610] text-gray-200 h-screen w-64 p-5 shadow-lg border border-gray-600 fixed">
      <h2 className="text-2xl font-bold mb-10 text-white">Siteware</h2>
      
      <ul className="space-y-3">
        <li className="hover:bg-gray-800 p-2 rounded-lg transition duration-300">
          <Link to="/" className="flex items-center space-x-2">
            <FaMicrophone className="text-white" />
            <span>Assistants</span>
          </Link>
        </li>
        <li className="hover:bg-gray-800 p-2 rounded-lg transition duration-300">
          <Link to="/campaigns" className="flex items-center space-x-2">
            <FaLayerGroup className="text-white" />
            <span>Campaigns</span>
          </Link>
        </li>

        {/* Accordion for Appointments */}
        <li>
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-2">
              <FaListAlt className="text-white" />
              <span>Appointments</span>
            </div>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen && (
            <ul className="pl-6 mt-2 space-y-4">
              <li className="hover:bg-gray-800 p-2 rounded-lg transition duration-300">
                <Link to="/appointments/inbound">Inbound Calls</Link>
              </li>
              <li className="hover:bg-gray-800 p-2 rounded-lg transition duration-300">
                <Link to="/appointments/outbound">Outbound Calls</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Divider */}
        <hr className="my-4 border-gray-700" />

        <li className="hover:bg-gray-800 p-2 rounded-lg transition duration-300">
          <Link to="/settings" className="flex items-center space-x-2">
            <FaCog className="text-white" />
            <span>Settings</span>
          </Link>
        </li>
        <li className="hover:bg-gray-800 p-2 rounded-lg transition duration-300">
          <Link to="/community" className="flex items-center space-x-2">
            <FaUsers className="text-white" />
            <span>Community</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
