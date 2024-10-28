import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import SmallLogo from './SmallLogo';
import { useTranslation } from 'react-i18next';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const initialSidebarState = JSON.parse(localStorage.getItem('sidebarOpen') || 'true');

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(initialSidebarState);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const isActive = (path: string) => location.pathname === path;
  const [sidebarOpen] = useState(false); // State to control sidebar visibility

  return (
    <div
      className={`sidebar fixed bottom-0 top-0 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:block  w-[280px] bg-gray-900  border-slate-800 bg-bg-gray-800 border ${isSidebarOpen ? 'w-64' : 'w-[95px]'} max-w-xs h-screen text-gray-200 transition-width duration-300 ease-in-out`}
    >
      
        <div>
          <div className="flex justify-between items-center mt-[24px]  ml-[20px]">
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
          <hr className=" border-gray-700 my-[23.5px]" />
          <ul className="space-y-2 mt-4 px-[16px] font-semibold text-[#F2F4F7]">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/') ? 'bg-gray-800 font-bold' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M8 17.0002H16M11.0177 2.76424L4.23539 8.03937C3.78202 8.39199 3.55534 8.5683 3.39203 8.7891C3.24737 8.98469 3.1396 9.20503 3.07403 9.4393C3 9.70376 3 9.99094 3 10.5653V17.8002C3 18.9203 3 19.4804 3.21799 19.9082C3.40973 20.2845 3.71569 20.5905 4.09202 20.7822C4.51984 21.0002 5.07989 21.0002 6.2 21.0002H17.8C18.9201 21.0002 19.4802 21.0002 19.908 20.7822C20.2843 20.5905 20.5903 20.2845 20.782 19.9082C21 19.4804 21 18.9203 21 17.8002V10.5653C21 9.99094 21 9.70376 20.926 9.4393C20.8604 9.20503 20.7526 8.98469 20.608 8.7891C20.4447 8.5683 20.218 8.39199 19.7646 8.03937L12.9823 2.76424C12.631 2.49099 12.4553 2.35436 12.2613 2.30184C12.0902 2.2555 11.9098 2.2555 11.7387 2.30184C11.5447 2.35436 11.369 2.49099 11.0177 2.76424Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                {isSidebarOpen && <span>{t('home')}</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/dashboard') ? 'bg-gray-800 font-bold' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M8 15V17M12 11V17M16 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                {isSidebarOpen && <span>{t('dashboard')}</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/agents"
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/agents') ? 'bg-gray-800 font-bold' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M4.00002 21.8174C4.6026 22 5.41649 22 6.8 22H17.2C18.5835 22 19.3974 22 20 21.8174M4.00002 21.8174C3.87082 21.7783 3.75133 21.7308 3.63803 21.673C3.07354 21.3854 2.6146 20.9265 2.32698 20.362C2 19.7202 2 18.8802 2 17.2V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H17.2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8V17.2C22 18.8802 22 19.7202 21.673 20.362C21.3854 20.9265 20.9265 21.3854 20.362 21.673C20.2487 21.7308 20.1292 21.7783 20 21.8174M4.00002 21.8174C4.00035 21.0081 4.00521 20.5799 4.07686 20.2196C4.39249 18.6329 5.63288 17.3925 7.21964 17.0769C7.60603 17 8.07069 17 9 17H15C15.9293 17 16.394 17 16.7804 17.0769C18.3671 17.3925 19.6075 18.6329 19.9231 20.2196C19.9948 20.5799 19.9996 21.0081 20 21.8174M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                {isSidebarOpen && <span>{t('agents')}</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/phone-numbers"
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/phone-numbers') ? 'bg-gray-800 font-bold' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                {isSidebarOpen && <span>{t('phone_numbers')}</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/voice-library" className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/voice-library') ? 'bg-gray-800 font-bold' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M6 11V13M10 9V15M14 7V17M18 11V13M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                {isSidebarOpen && <span>{t('voice_library')}</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/knowledge-base"
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/knowledge-base') ? 'bg-gray-800 font-bold' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                {isSidebarOpen && <span>{t('knowledge_base')}</span>}
              </Link>
            </li>

            <hr className=" border-gray-700 my-4" />
          </ul>

          <div className="pb-10">
            <Link
              to="/profile"
              className={`flex items-center space-x-3 p-2 rounded-lg transition ${isActive('/profile') ? 'bg-gray-800 font-bold' : ''}`}
            >
              <div className=''>
                <div>

                </div>
                
                <div className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg absolute bottom-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-300 to-purple-300"></div>
                {isSidebarOpen?  <div>
                    <p className="text-white font-semibold">Alex Smith</p>
                    <p className="text-gray-400 text-sm">alexsmith@icloud.com</p>
                  </div>:""}
                </div>

              </div>
            </Link>

          </div>
        </div>


    </div>
  );
};

export default Sidebar;
