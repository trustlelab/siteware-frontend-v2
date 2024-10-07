import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaCog, FaUsers, FaLayerGroup, FaListAlt } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'; // Smart toggle icons
import Logo from './Logo';
import ThemeToggle from './ToggleTheme';

const Sidebar: React.FC = () => {
  // Load sidebar state from localStorage
  const initialSidebarState: boolean = JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialSidebarState);
  const [isOpen, setIsOpen] = useState<boolean>(false); // State for accordion, initially closed

  // Persist sidebar state in localStorage whenever it's updated
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Handle sidebar toggle
  const handleSidebarToggle = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle dropdown toggle for Appointments
  const handleDropdownToggle = (): void => {
    setIsOpen(prevState => !prevState || false); // Only set to true, never false
  };

  return (
    <div className={`  border-gray-300 dark:border-slate-800 dark:bg-bg-gray-800 p-5 border ${isSidebarOpen ? 'w-64' : 'w-20'} h-screen text-gray-900 dark:text-gray-200 transition-width duration-300`}>
    <aside className='sidebar fixed'>
    <div className="flex justify-between items-center">
      <Logo width={126.95} height={24.5} />

        <button
          onClick={handleSidebarToggle}
          className="text-white focus:outline-none"
        >
          {isSidebarOpen ? <MdChevronLeft size={24} /> : <MdChevronRight size={24} />}
        </button>
      </div>

      <ul className="space-y-3 mt-4">
        <li className="">
          <Link to="/" className="flex items-center space-x-2 focus:outline-none">
            <FaMicrophone className="icon" />
            {isSidebarOpen && <span>Assistants</span>}
          </Link>
        </li>
        <li className="">
          <Link to="/campaigns" className="flex items-center space-x-2 focus:outline-none">
            <FaLayerGroup className="icon" />
            {isSidebarOpen && <span>Campaigns</span>}
          </Link>
        </li>

        {/* Accordion for Appointments */}
        <li>
          <div
            className="flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition duration-300 cursor-pointer focus:outline-none ring-indigo-500 focus:ring-2 ring-offset-2"
            onClick={handleDropdownToggle}
            aria-expanded={isOpen}
          >
            <div className="flex items-center space-x-2">
              <FaListAlt className="icon" />
              {isSidebarOpen && <span>Appointments</span>}
            </div>
            {isSidebarOpen && (isOpen ? <span>&#x25B2;</span> : <span>&#x25BC;</span>)} {/* Up/Down arrows */}
          </div>
          {isOpen && (
            <ul className={`space-y-4 mt-2 ${isSidebarOpen ? 'pl-6' : 'pl-2'}`}>
              <li className="">
                <Link to="/appointments/inbound" className="focus:outline-none">Inbound Calls</Link>
              </li>
              <li className="">
                <Link to="/appointments/outbound" className="focus:outline-none">Outbound Calls</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Divider */}
        <hr className="border-gray-300 dark:border-gray-700 my-4" />

        <li className="">
          <Link to="/settings" className="flex items-center space-x-2 focus:outline-none">
            <FaCog className="icon" />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
        </li>
        <li className="">
          <Link to="/community" className="flex items-center space-x-2 focus:outline-none">
            <FaUsers className="icon" />
            {isSidebarOpen && <span>For Developers</span>}
          </Link>
        </li>
        <ThemeToggle/>

      </ul>
    </aside>

    </div>
  );
};

export default Sidebar;
