import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import SmallLogo from './SmallLogo';
import { useTranslation } from 'react-i18next';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { AgentsIcon, CubeIcon, DashboardIcon, FavoritesIcon, HomeIcon, KnowledgebaseIcon, PhoneNumbersIcon, StarIcon, VoiceAgentIcon, } from '../../assets/icons/Icons';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ThemeChanger from './ThemeChnager';
import LanguageSwitcher from './LanguageSwitcher';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const initialSidebarState = JSON.parse(localStorage.getItem('sidebarOpen') || 'true');

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialSidebarState);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuToggle = (label: string) => {
    setExpandedMenus((prevState) => {
      const newState = { ...prevState, [label]: !prevState[label] };
      // Collapse other menus if another main item is clicked
      Object.keys(newState).forEach((key) => {
        if (key !== label) newState[key] = false;
      });
      return newState;
    });
  };

  const isActive = (path: string) => location.pathname === path;

  const isParentActive = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((subItem: any) => isActive(subItem.path));
    }
    return false;
  };

  // Sidebar items defined as an array of objects
  const sidebarItems = [
    { path: '/', icon: <HomeIcon />, label: 'home' },
    { path: '/dashboard', icon: <DashboardIcon />, label: 'dashboard' },
    {
      path: '/agents',
      icon: <AgentsIcon />,
      label: 'agents',
      subItems: [
        { path: '/agents/favorites', label: 'favorites', icon: <FavoritesIcon />, count: 2 },
        { path: '/agents/category-2', label: 'category #2', icon: <StarIcon /> },
        { path: '/agents/category-3', label: 'category #3', icon: <CubeIcon /> },
      ],
    },
    { path: '/phone-numbers', icon: <PhoneNumbersIcon />, label: 'phone_numbers' },
    { path: '/voice-library', icon: <VoiceAgentIcon />, label: 'voice_library' },
    { path: '/knowledge-base', icon: <KnowledgebaseIcon />, label: 'knowledge_base' },
  ];

  return (
    <div
      className={`sidebar fixed bottom-0 top-0 transition-transform duration-300 transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:block w-[280px] bg-gray-900 border-slate-800 bg-bg-gray-800 border ${isSidebarOpen ? 'w-64' : 'w-[95px]'} max-w-xs h-screen text-gray-200 transition-width duration-300 ease-in-out`}
    >
      <div>
        <div className="flex justify-between items-center mt-[24px] ml-[20px]">
          {isSidebarOpen ? (
            <Link to="/">
              <Logo width={126.95} height={24.5} />
            </Link>
          ) : (
            <Link to="/">
              <SmallLogo width={30} height={30} mode='light' />
            </Link>
          )}
          <button onClick={handleSidebarToggle} className="text-white focus:outline-none p-2">
            {isSidebarOpen ? <GoChevronLeft /> : <GoChevronRight />}
          </button>
        </div>
        <hr className="border-gray-700 my-[23.5px]" />
        <ul className="space-y-2 mt-4 px-[16px] font-semibold text-[#F2F4F7]">
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <div
                className={`flex justify-between items-center hover:bg-gray-700 rounded-lg ${isActive(item.path) || isParentActive(item) || (item.subItems && expandedMenus[item.label])
                  ? 'bg-gray-700'
                  : ''
                  }`}
                onClick={() => (item.subItems ? handleMenuToggle(item.label) : setExpandedMenus({}))}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition duration-300 ease-in-out ${isActive(item.path) || isParentActive(item) || (item.subItems && expandedMenus[item.label])
                    ? 'font-bold'
                    : ''
                    }`}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{t(item.label)}</span>}
                </Link>
                {item.subItems && isSidebarOpen && (
                  <button onClick={() => handleMenuToggle(item.label)} className="text-white focus:outline-none p-2">
                    {expandedMenus[item.label] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                )}
              </div>
              {item.subItems && isSidebarOpen && expandedMenus[item.label] && (
                <ul className="ml-2 mt-2 space-y-1 transition-height duration-300 ease-in-out">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path} className="hover:bg-gray-600 rounded-lg">
                      <Link
                        to={subItem.path}
                        className={`flex items-center justify-between p-2 rounded-lg transition duration-300 ease-in-out ${isActive(subItem.path) ? 'bg-gray-700 font-bold' : ''}`}
                      >
                        <div className="flex items-center space-x-3">
                          {subItem.icon}
                          {isSidebarOpen && <span>{t(subItem.label)}</span>}
                        </div>
                        {subItem.count && <span className="text-sm bg-gray-500 text-white rounded-full px-2 py-1">{subItem.count}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <hr className="border-gray-700 my-4" />
        </ul>

        <div className="pb-10 absolute bottom-0">

          <div className='px-4'>
            <LanguageSwitcher />
            <ThemeChanger />
          </div>

          <Link
            to="/profile"
            className={`flex items-center space-x-3 p-2 rounded-lg transition duration-300 ease-in-out ${isActive('/profile') ? 'bg-gray-800 font-bold' : ''}`}
          >
            <div className=''>
              <div className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg ">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-300 to-purple-300"></div>
                {isSidebarOpen ? (
                  <div>
                    <p className="text-white font-semibold">Alex Smith</p>
                    <p className="text-gray-400 text-sm">alexsmith@icloud.com</p>
                  </div>
                ) : ""}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
