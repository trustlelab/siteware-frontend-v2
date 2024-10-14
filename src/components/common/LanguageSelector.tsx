import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem('i18nLanguage') || 'en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('i18nLanguage', lng);
    setIsOpen(false); // Close dropdown after selection
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
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

  // Load saved language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className="inline-block relative text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 border rounded-md dark:text-white focus:outline-none"
      >
        <FiGlobe className="mr-2" />
      </button>
      {isOpen && (
        <div className="absolute bg-white shadow-lg mt-2 rounded-md w-32">
          <ul className="py-1 text-gray-700">
            <li>
              <button
                onClick={() => changeLanguage('en')}
                className={`block px-4 py-2 text-sm ${language === 'en' ? 'font-bold' : ''}`}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => changeLanguage('de')}
                className={`block px-4 py-2 text-sm ${language === 'de' ? 'font-bold' : ''}`}
              >
                Deutsch
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
