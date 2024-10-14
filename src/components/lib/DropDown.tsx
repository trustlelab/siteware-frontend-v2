import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type DropdownProps = {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  searchable?: boolean; // Whether the dropdown is searchable or not
};

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, onChange, searchable = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for dropdown container

  // Handle selecting an option
  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm(''); // Clear search when an option is selected
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative mb-4 w-full">
      {label && (
        <label className="block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center border-gray-300 dark:border-[#4B5563] bg-white dark:bg-[#1D2939] px-3 py-2 border rounded-md focus:ring-1 focus:ring-purple-500 w-full text-left focus:outline-none dark:text-white transition duration-200"
      >
        {selected || 'Select an option'}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="right-0 left-0 z-10 absolute border-gray-300 dark:border-[#4B5563] bg-white dark:bg-[#1D2939] shadow-lg mt-2 p-1 border rounded-md max-h-60 overflow-auto">
          {searchable && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border-gray-300 dark:border-[#4B5563] dark:bg-[#1D2939] mb-2 p-2 border rounded-md focus:ring-1 focus:ring-purple-500 w-full focus:outline-none dark:text-white"
            />
          )}
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-900 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 text-sm dark:text-gray-400">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
