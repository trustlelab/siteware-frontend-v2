import { useState } from 'react';
import { FaCog, FaMicrophone, FaVolumeUp, FaTools, FaChartLine, FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface TabProps {
  onSelect: (tabName: string) => void;
  agentType: string | undefined;
}


const Tab: React.FC<TabProps> = ({ onSelect, agentType }) => {
  console.log(`Agent ${agentType}`)
  const { t } = useTranslation();

  const allTabs = [
    { name: 'Agent', icon: <FaCog className="mr-1" />, translationKey: 'agent' },
    { name: 'LLM', icon: <FaCog className="mr-1" />, translationKey: 'llm' },
    { name: 'Transcriber', icon: <FaMicrophone className="mr-1" />, translationKey: 'transcriber' },
    { name: 'Voice', icon: <FaVolumeUp className="mr-1" />, translationKey: 'voice' },
    { name: 'Call', icon: <FaPhone className="mr-1" />, translationKey: 'call' },
    { name: 'Functions', icon: <FaTools className="mr-1" />, translationKey: 'functions' },
    { name: 'Tasks', icon: <FaChartLine className="mr-1" />, translationKey: 'tasks' },
    { name: 'Chat', icon: <FaCog className="mr-1" />, translationKey: 'chat' },
  ];

  const filteredTabs = agentType === 'TEXT' 
    ? allTabs.filter(tab => ['Agent', 'LLM', 'Chat'].includes(tab.name))
    : allTabs;

  const [activeTab, setActiveTab] = useState(filteredTabs[0].name);

  const handleClick = (tabName: string) => {
    setActiveTab(tabName);
    onSelect(tabName);
  };

  console.log('Rendering Tabs with agentType:', agentType); // Log to confirm agentType

  return (
    <div className="bg-gray-100 dark:bg-gray-800 mb-4 p-1 rounded-lg w-full">
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {filteredTabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleClick(tab.name)}
            className={`flex items-center px-4 py-2 whitespace-nowrap rounded-md transition duration-300 ${
              activeTab === tab.name
                ? 'border border-gray-200 bg-white dark:border-gray-950 dark:bg-gray-700 dark:text-white'
                : 'text-gray-400 hover:dark:bg-gray-700'
            }`}
          >
            {tab.icon} {t(tab.translationKey, tab.name)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
