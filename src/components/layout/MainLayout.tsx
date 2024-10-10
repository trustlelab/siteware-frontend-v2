import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../dashboard/Header';

/**
 *
 */
const MainLayout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar will be shown on all logged-in routes */}
      <main className="bg-[#fdfdfd] dark:bg-[#0d121a] w-full">
        <Header />
        <Outlet /> {/* Render the routed component here */}
      </main>
    </div>
  );
};

export default MainLayout;
