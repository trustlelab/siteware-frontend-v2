import { FaBell, FaBars } from 'react-icons/fa'; // Import FaBars for the mobile menu
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ToggleTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import LanguageSelector from '../common/LanguageSelector';

interface HeaderProps {
  toggleSidebar: () => void; 
}


const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.userProfile.profile);

  return (
    <header className="flex justify-between items-center p-4  bg-transparent w-full">
      {/* Hamburger menu icon for mobile screens */}
      <button
        className="lg:hidden focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars className="text-gray-600 dark:text-gray-300" size={24} />
      </button>

    

      <h1 className="font-bold text-xl text-gray-800 dark:text-white hidden lg:block">
     
      </h1>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        <button className="relative focus:outline-none">
          <FaBell className="text-gray-600 dark:text-gray-300" size={24} />
          <span className="inline-flex absolute top-0 right-0 justify-center items-center bg-red-600 px-1 py-1 rounded-full font-bold text-red-100 text-xs leading-none">
            3
          </span>
        </button>

        <LanguageSelector />

        <button onClick={() => navigate('/profile')} className="focus:outline-none">
          {profile?.avatarUrl ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${profile.avatarUrl}`}
              alt="Profile"
              className="rounded-full w-8 h-8"
            />
          ) : (
            <MdAccountCircle className="text-gray-600 dark:text-gray-300" size={32} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
