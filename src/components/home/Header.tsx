import React from 'react';
import { FaBell } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center shadow-md p-4">
      <h1 className="font-bold text-xl dark:text-white">Home</h1>
      <div className="flex items-center space-x-4">
        <button className="relative focus:outline-none">
          <FaBell className="text-gray-600 dark:text-gray-300" size={24} />
          <span className="inline-flex top-0 right-0 absolute justify-center items-center bg-red-600 px-1 py-1 rounded-full font-bold text-red-100 text-xs leading-none">3</span>
        </button>
        <button onClick={() => navigate('/profile')}>
          <MdAccountCircle className="text-gray-600 dark:text-gray-300" size={32} />
        </button>
      </div>
    </header>
  );
};

export default Header;