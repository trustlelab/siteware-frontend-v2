import { FaBell } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ToggleTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

/**
 *
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.userProfile.profile);

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="font-bold text-xl dark:text-white"></h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="relative focus:outline-none">
          <FaBell className="text-gray-600 dark:text-gray-300" size={24} />
          <span className="inline-flex top-0 right-0 absolute justify-center items-center bg-red-600 px-1 py-1 rounded-full font-bold text-red-100 text-xs leading-none">
            3
          </span>
        </button>
        <button onClick={() => navigate('/profile')}>
          {profile?.avatarUrl ? (
            <img src={`${import.meta.env.VITE_API_BASE_URL}${profile.avatarUrl}`} alt="Profile" className="rounded-full w-8 h-8" />
          ) : (
            <MdAccountCircle className="text-gray-600 dark:text-gray-300" size={32} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
