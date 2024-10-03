import React from 'react';
import { FaCog, FaMicrophone, FaVolumeUp, FaFonticons, FaTools, FaChartLine } from 'react-icons/fa';

interface TabProps {
    onSelect: (tabName: string) => void;
}

const Tab: React.FC<TabProps> = ({ onSelect }) => {
    const tabs = [
        { name: 'Model', icon: <FaCog className="mr-1" /> },
        { name: 'Transcriber', icon: <FaMicrophone className="mr-1" /> },
        { name: 'Voice', icon: <FaVolumeUp className="mr-1" /> },
        { name: 'Functions', icon: <FaFonticons className="mr-1" /> },
        { name: 'Advanced', icon: <FaTools className="mr-1" /> },
        { name: 'Analysis', icon: <FaChartLine className="mr-1" /> },
    ];

    const [activeTab, setActiveTab] = React.useState(tabs[0].name);

    const handleClick = (tabName: string) => {
        setActiveTab(tabName);
        onSelect(tabName); // Emit the tab name
    };

    return (
        <div className="bg-gray-800 shadow-md mb-4 rounded-lg">
            <div className="flex space-x-4 p-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => handleClick(tab.name)}
                        className={`flex items-center px-4 py-2 rounded-lg transition duration-300 ${
                            activeTab === tab.name 
                                ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white' 
                                : 'text-gray-400 hover:bg-gray-700'
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
