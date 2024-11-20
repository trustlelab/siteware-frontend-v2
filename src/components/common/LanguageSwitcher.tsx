import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';
import { DownArrowIcon } from '../../assets/icons/Icons';

const GlobeIcon = FiGlobe;

interface LanguageSwitcherProps {
    isExpanded: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isExpanded }) => {
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
        <div className="relative text-left" ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className={`w-60 p-3 rounded-md flex items-center gap-2 cursor-pointer ${
                    isExpanded ? 'w-full' : 'w-auto'
                }`}
            >
                <GlobeIcon />
                {isExpanded && (
                    <>
                        <div className="flex-grow flex items-center gap-2">
                            <div className="text-gray-200 text-base font-semibold">Language</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-white text-base font-bold">{language.toUpperCase()}</div>
                            <DownArrowIcon />
                        </div>
                    </>
                )}
            </div>
            {isOpen && (
                <div className="absolute bg-gray-950 shadow-lg mt-2 rounded-md w-60">
                    <ul className="py-1">
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

export default LanguageSwitcher;
