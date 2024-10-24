import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../dashboard/Header';

/**
 * Main layout with responsive sidebar
 */
const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen !font-manrope">
      {/* Sidebar for larger screens */}
      <div className={`fixed z-50 inset-y-0 left-0 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:block `}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full bg-[#fdfdfd] ">
        <Header toggleSidebar={toggleSidebar} /> {/* Header with toggle button for mobile */}

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
