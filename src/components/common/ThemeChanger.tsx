import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FaMoon, FaSun } from 'react-icons/fa';

interface ThemeChangerProps {
  initialTheme?: 'light' | 'dark';
  isExpanded: boolean;
}

const ThemeChanger: React.FC<ThemeChangerProps> = ({ initialTheme = 'light', isExpanded }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : initialTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className="w-60 p-3 mt-2 rounded-md flex items-center gap-2 cursor-pointer"
      onClick={toggleTheme}
    >
      {isDarkMode ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5 text-yellow-400" />}
      {isExpanded && (
        <div className="flex-grow flex items-center gap-2">
          <div className="text-base font-semibold text-gray-200">
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>
      )}
      {isExpanded && (
        <div
          className={clsx(
            'w-9 h-5 rounded-full flex items-center p-0.5',
            isDarkMode ? 'bg-[#6840c6] justify-end' : 'bg-gray-300 justify-start'
          )}
        >
          <div
            className={clsx(
              'w-4 h-4 rounded-full shadow',
              isDarkMode ? 'bg-[#101828]' : 'bg-gray-800'
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ThemeChanger;
