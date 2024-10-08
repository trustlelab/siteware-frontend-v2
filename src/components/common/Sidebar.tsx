import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaFolder, FaTools, FaCube, FaUsers, FaMicrophone, FaLayerGroup } from 'react-icons/fa';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import Logo from './Logo';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const initialSidebarState = JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
  const initialPlatformState = JSON.parse(localStorage.getItem('platformOpen') || 'false');
  const initialLogsState = JSON.parse(localStorage.getItem('logsOpen') || 'false');

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialSidebarState);
  const [platformOpen, setPlatformOpen] = useState<boolean>(initialPlatformState);
  const [logsOpen, setLogsOpen] = useState<boolean>(initialLogsState);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('platformOpen', JSON.stringify(platformOpen));
  }, [platformOpen]);

  useEffect(() => {
    localStorage.setItem('logsOpen', JSON.stringify(logsOpen));
  }, [logsOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePlatformToggle = () => {
    setPlatformOpen((prevState: boolean) => !prevState);
  };

  const handleLogsToggle = () => {
    setLogsOpen((prevState: boolean) => !prevState);
  };

  return (
    <div className="border-gray-300 dark:border-slate-800 dark:bg-bg-gray-800 p-5 border w-64 max-w-xs h-screen text-gray-900 dark:text-gray-200 transition-width">
      <aside className="fixed flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center">
            {isSidebarOpen ? <Logo width={126.95} height={24.5} /> : <span className="font-bold text-xl">S</span>}
            <button onClick={handleSidebarToggle} className="text-white focus:outline-none">
              {isSidebarOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
            </button>
          </div>

          <ul className="space-y-1 mt-4">
            <li>
              <Link to="/" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/' ? 'bg-gray-100 dark:bg-gray-800 font-bold' : ''}`}>                <FaMicrophone className="icon" />
                {isSidebarOpen && <span>Overview</span>}
              </Link>
            </li>

            <li>
              <div
                className={`flex justify-between items-center p-2 rounded-lg transition cursor-pointer w-full ${platformOpen ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                onClick={handlePlatformToggle}
                aria-expanded={platformOpen}
              >
                <div className="flex items-center space-x-3">
                  <FaLayerGroup className="icon" />
                  {isSidebarOpen && <span>Platform</span>}
                </div>
                {isSidebarOpen && (platformOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />)}
              </div>
              {platformOpen && (
                <ul className={`space-y-1 mt-0.5 dark:bg-[#161e2d] p-2 rounded-lg ${isSidebarOpen ? 'pl-4' : 'pl-2'}`}>
                  <li>
                    <Link to="/agents" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/platform/assistants' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaMicrophone className="icon" />
                      {isSidebarOpen && <span>Agents</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/phone-numbers" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/platform/phone-numbers' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaPhone className="icon" />
                      {isSidebarOpen && <span>Phone Numbers</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/platform/files" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/platform/files' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaFolder className="icon" />
                      {isSidebarOpen && <span>Files</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/platform/tools" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/platform/tools' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaTools className="icon" />
                      {isSidebarOpen && <span>Tools</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/platform/blocks" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/platform/blocks' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaCube className="icon" />
                      {isSidebarOpen && <span>Blocks</span>}
                    </Link>
                  </li>
                  <li>
                    <Link to="/platform/squads" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/platform/squads' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaUsers className="icon" />
                      {isSidebarOpen && <span>Squads</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <div
                className={`flex justify-between items-center p-2 rounded-lg transition cursor-pointer w-full ${logsOpen ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                onClick={handleLogsToggle}
                aria-expanded={logsOpen}
              >
                <div className="flex items-center space-x-3">
                  <FaFolder className="icon" />
                  {isSidebarOpen && <span>Logs</span>}
                </div>
                {isSidebarOpen && (logsOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />)}
              </div>
              {logsOpen && (
                <ul className={`space-y-1 mt-0.5 dark:bg-gray-700 p-2 rounded-lg ${isSidebarOpen ? 'pl-4' : 'pl-2'}`}>
                  <li>
                    <Link to="/logs/voice-library" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/logs/voice-library' ? 'bg-gray-800 font-bold' : ''}`}>
                      <FaFolder className="icon" />
                      {isSidebarOpen && <span>Voice Library</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <hr className="border-gray-300 dark:border-gray-700 my-4" />
          </ul>
        </div>

        <div className="pb-4">
          <Link to="/profile" className={`flex items-center space-x-3 p-2 rounded-lg transition ${location.pathname === '/profile' ? 'bg-gray-800 font-bold' : ''}`}>
            <FaUsers className="icon" />
            {isSidebarOpen && <span>Profile</span>}
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;