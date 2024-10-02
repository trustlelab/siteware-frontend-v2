import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
    // Initialize state based on localStorage value or default to light mode
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark'; // Return true if dark mode is saved
    });

    // Apply the theme class on initial mount
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark'); // Apply dark class
        } else {
            document.documentElement.classList.remove('dark'); // Remove dark class
        }
    }, [isDarkMode]);

    // Update localStorage and class whenever isDarkMode changes
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save the theme in localStorage
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev); // Toggle the theme
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="flex items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
        >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
            <span className="ml-2 dark:text-white">{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
    );
};

export default ThemeToggle;
