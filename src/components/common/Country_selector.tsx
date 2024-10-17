import React, { useState, useEffect, useRef } from 'react';

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
    <div ref={dropdownRef} className="relative inline-block w-full">
      <div
        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-2 px-4 rounded cursor-pointer"
        onClick={toggleDropdown}
      >
        {selected ? selected.label : 'Select Country'}
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow-md rounded mt-1 max-h-40 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
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
