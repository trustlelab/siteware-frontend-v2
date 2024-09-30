import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved user preference in local storage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        // Apply the theme class to the body
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800 " />}
            <span className="ml-2 dark:text-white">{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
    );
};

export default ThemeToggle;
