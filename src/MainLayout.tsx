import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex justify-between">
      <Sidebar /> {/* Sidebar will be shown on all logged-in routes */}
      <main className="bg-[#fdfdfd] dark:bg-[#0d121a] w-[90%]">
        <Outlet /> {/* Render the routed component here */}
      </main>
    </div>
  );
};

export default MainLayout;
