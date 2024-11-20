import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';

/**
 * Main layout with responsive sidebar
 */
const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen !font-manrope ">
      {/* Sidebar for larger screens */}
      <div className={`fixed z-50 inset-y-0 left-0 `}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full bg-[#fdfdfd] dark:bg-[#101828] sm:ml-[280px] md:ml-[280px]">

        {/* Content Area */}
        <main className="flex-1 p-4">
          <Outlet /> {/* Render the routed component here */}
        </main>
      </div>

      {/* Overlay for mobile when the sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;
