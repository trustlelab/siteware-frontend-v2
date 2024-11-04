import React, { useState, useEffect, useRef } from 'react';
import { DownArrowIcon } from '../../assets/icons/Icons';

// Define the type for your options
interface CountryOption {
  value: string;
  label: string;
}

interface CountrySelectorProps {
  options: CountryOption[];
  onSelect: (option: CountryOption) => void;
  selected: CountryOption | null;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to detect outside clicks

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle option selection
  const handleOptionClick = (option: CountryOption) => {
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selecting
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block ">
      <div
        className=" dark:bg-gray-800 text-black dark:text-white py-2 px-2 rounded cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <span>{selected ? selected.value : '  '}</span>
        <DownArrowIcon/>
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-72 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded mt-2 max-h-60 overflow-auto z-20">
          {options.map((option) => (
            <li
              key={option.value}
              className="py-3 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelector;
