import { useState } from 'react';
import { FaCog, FaMicrophone, FaVolumeUp, FaTools, FaChartLine, FaPhone } from 'react-icons/fa';

interface TabProps {
  onSelect: (tabName: string) => void;
}

/**
 *
 */
const Tab: React.FC<TabProps> = ({ onSelect }) => {
  const tabs = [
    { name: 'Agent', icon: <FaCog className="mr-1" /> },
    { name: 'LLM', icon: <FaCog className="mr-1" /> },
    { name: 'Transcriber', icon: <FaMicrophone className="mr-1" /> },
    { name: 'Voice', icon: <FaVolumeUp className="mr-1" /> },
    { name: 'Call', icon: <FaPhone className="mr-1" /> },
    { name: 'Functions', icon: <FaTools className="mr-1" /> },
    { name: 'Tasks', icon: <FaChartLine className="mr-1" /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  /**
   *
   */
  const handleClick = (tabName: string) => {
    setActiveTab(tabName);
    onSelect(tabName); // Emit the tab name
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 mb-4 rounded-lg w-[900px]">
      <div className="flex space-x-4 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleClick(tab.name)}
            className={`flex items-center px-4 py-2 rounded-full transition duration-300 ${
              activeTab === tab.name ? 'bg-white dark:bg-gray-700  shadow-lg 500 dark:text-white' : 'text-gray-400 hover:dark:bg-gray-700'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
