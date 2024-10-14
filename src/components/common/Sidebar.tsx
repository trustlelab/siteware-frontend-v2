import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhone, FaFolder, FaTools, FaCube, FaUsers, FaLayerGroup, FaSignOutAlt } from 'react-icons/fa';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineDashboard, MdSupportAgent } from 'react-icons/md';
import { PiUserSound } from "react-icons/pi";
import Logo from './Logo';
import SmallLogo from './SmallLogo';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation('sidebar');
  const location = useLocation();
  const initialSidebarState = JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
  const initialOpenState = JSON.parse(localStorage.getItem('openSubmenus') || '{}');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialSidebarState);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(initialOpenState);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('openSubmenus', JSON.stringify(openSubmenus));
  }, [openSubmenus]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenus(prevState => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;
  const isPlatformActive = () => location.pathname.startsWith('/platform');

  // Array for the platform submenu items
  const platformMenuItems = [
    { path: '/agents', label: t('agents'), icon: MdSupportAgent },
    { path: '/phone-numbers', label: t('phone_numbers'), icon: FaPhone },
    { path: '/voices', label: t('voices'), icon: PiUserSound },
    { path: '/files', label: t('files'), icon: FaFolder },
    { path: '/platform/tools', label: t('tools'), icon: FaTools },
    { path: '/platform/blocks', label: t('blocks'), icon: FaCube },
    { path: '/platform/squads', label: t('squads'), icon: FaUsers },
  ];

  return (
    <div
      className={`border-gray-300 dark:border-slate-800 dark:bg-bg-gray-800 p-5 border ${isSidebarOpen ? 'w-64' : 'w-[95px]'} max-w-xs h-screen text-gray-900 dark:text-gray-200 transition-width duration-300 ease-in-out`}
    >
      <aside className="fixed flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-center">
            {isSidebarOpen ? (
              <Link to="/">
                <Logo width={126.95} height={24.5} />
              </Link>
            ) : (
              <Link to="/">
                <SmallLogo width={30} height={30} />
              </Link>
            )}
            <button onClick={handleSidebarToggle} className="dark:text-white focus:outline-none rotate-[268deg]">
              {isSidebarOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
            </button>
          </div>

          <ul className="space-y-1 mt-4">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/') && !isPlatformActive() ? ' dark:bg-gray-800 bg-gray-100 font-bold' : ''}`}
              >
                <MdOutlineDashboard className="icon" />
                {isSidebarOpen && <span>{t('overview')}</span>}
              </Link>
            </li>

            <li>
              <div
                className={`flex justify-between items-center p-2 rounded-lg transition cursor-pointer w-full ${isPlatformActive() || openSubmenus.platform ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                onClick={() => toggleSubmenu('platform')}
                aria-expanded={openSubmenus.platform}
              >
                <div className="flex items-center space-x-3">
                  <FaLayerGroup className="icon" />
                  {isSidebarOpen && <span>{t('platform')}</span>}
                </div>
                {isSidebarOpen && (openSubmenus.platform ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />)}
              </div>
              {openSubmenus.platform && (
                <ul className={`space-y-1 mt-0.5 dark:bg-[#161e2d] p-2 rounded-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'pl-4' : 'pl-2'}`}>
                  {platformMenuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center text-black dark:text-white  p-2 rounded-full px-3 space-x-3 transition ${isActive(item.path) ? 'border-gray-200 dark:bg-purple-800/20  bg-gray-100  border dark:border-purple-800/60 font-bold' : ''}`}
                      >
                        <item.icon className="icon" />
                        {isSidebarOpen && <span>{item.label}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <div
                className={`flex justify-between items-center p-2 rounded-lg transition cursor-pointer w-full ${openSubmenus.logs ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                onClick={() => toggleSubmenu('logs')}
                aria-expanded={openSubmenus.logs}
              >
                <div className="flex items-center space-x-3">
                  <FaFolder className="icon" />
                  {isSidebarOpen && <span>{t('logs')}</span>}
                </div>
                {isSidebarOpen && (openSubmenus.logs ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />)}
              </div>
              {openSubmenus.logs && (
                <ul className={`space-y-1 mt-0.5 dark:bg-gray-700 p-2 rounded-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'pl-4' : 'pl-2'}`}>
                  <li>
                    <Link
                      to="/logs/voice-library"
                      className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/logs/voice-library') ? 'bg-gray-800 font-bold' : ''}`}
                    >
                      <FaFolder className="icon" />
                      {isSidebarOpen && <span>{t('voice_library')}</span>}
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <hr className="border-gray-300 dark:border-gray-700 my-4" />
          </ul>
        </div>

        <div className="pb-10">
          <Link
            to="/profile"
            className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/profile') ? 'bg-gray-800 font-bold' : ''}`}
          >
            <FaUsers className="icon" />
            {isSidebarOpen && <span>{t('profile')}</span>}
          </Link>
          <button onClick={handleLogout} className={`flex items-center space-x-3 p-2 rounded-lg transition w-full mt-4 ${'bg-gray-100 dark:bg-gray-800'}`}>
            <FaSignOutAlt className="icon" />
            {isSidebarOpen && <span>{t('logout')}</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
