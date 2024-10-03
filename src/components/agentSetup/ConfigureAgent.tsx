import React, { useState } from 'react';
import Tab from '../config/tab';
import ModelConfig from '../config/model';
import { FaPhone, FaComments } from 'react-icons/fa';

const ConfigureAgent: React.FC = () => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState<string>('Model');

    const handleTabSelect = (tabName: string) => {
        console.log('Selected Tab:', tabName);
        setActiveTab(tabName); // Update the active tab
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Model':
                return <ModelConfig />;
            case 'Transcriber':
                return <div>Transcriber Component Content</div>;
            case 'Voice':
                return <div>Voice Component Content</div>;
            case 'Functions':
                return <div>Functions Component Content</div>;
            case 'Advanced':
                return <div>Advanced Component Content</div>;
            case 'Analysis':
                return <div>Analysis Component Content</div>;
            default:
                return <div>Select a tab to view content.</div>;
        }
    };
    const assistantNames = ['Assistant 1', 'Assistant 2', 'Assistant 3', 'Assistant 4', 'Assistant 5'];



    return (
        <main className='flex space-y-4 m-10 w-full'>
            <div className='flex space-y-4'>
                <div className='space-x-4 w-[230px] h-screen'>
                    {assistantNames.map((name, index) => (
                        <div key={index} className="hover:bg-gray-700 p-2 rounded text-white">
                            {name}
                        </div>
                    ))}
                </div>
                <div className='space-y-4 w-full'>


                    <div className='flex justify-between'>
                        <button className='dark:bg-black px-6 p-2 rounded-full'>
                            My assistant
                        </button>

                        <div className="flex space-x-4">

                            <div className="border-green-600 bg-gray-900 px-5 p-1 border rounded-lg text-gray-300">
                                <div className="font-semibold text-xl">$0.05/min</div>

                            </div>

                            {/* Button to receive incoming calls */}
                            <button className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md p-2 rounded-lg text-gray-300 transition duration-200">
                                <FaPhone className="mr-2" /> {/* Phone icon */}
                                Receive Incoming Calls
                            </button>

                            {/* Button to speak to your agent */}
                            <button className="flex items-center bg-purple-700 hover:bg-purple-800 shadow-md p-2 rounded-lg text-white transition duration-200">
                                <FaComments className="mr-2" /> {/* Comments icon */}
                                Speak to Your Agent
                            </button>
                        </div>
                    </div>
                    <Tab onSelect={handleTabSelect} />
                    <div className="mt-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ConfigureAgent;
