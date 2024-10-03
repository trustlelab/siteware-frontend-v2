import React, { useState } from 'react';
import AgentCard from './agentTemplate';
import { BsBodyText } from "react-icons/bs";
import { RiUserVoiceLine } from "react-icons/ri";

const CreateAgent: React.FC = () => {
    const [agentType, setAgentType] = useState<'voice' | 'text'>('text'); // Initialize with 'text'



    const templates = [
        {
            id: 1,
            name: 'Nina',
            type: 'OUTBOUND',
            subtitle: 'Generic sales model. Select this and you can further customize.',
            img: 'https://via.placeholder.com/80?text=Nina', // Placeholder for the avatar image
        },
        {
            id: 2,
            name: 'Nina',
            type: 'INBOUND',
            subtitle: 'Generic sales model. Select this and you can further customize.',
            img: 'https://via.placeholder.com/80?text=Nina', // Placeholder for the avatar image
        },
        {
            id: 3,
            name: 'Nina',
            type: 'TRIGGER',
            subtitle: 'Generic sales model. Select this and you can further customize.',
            img: 'https://via.placeholder.com/80?text=Nina', // Placeholder for the avatar image
        },
        {
            id: 4,
            name: 'Nina',
            type: 'TRIGGER',
            subtitle: 'Generic sales model. Select this and you can further customize.',
            img: 'https://via.placeholder.com/80?text=Nina', // Placeholder for the avatar image
        },
        {
            id: 5,
            name: 'Nina',
            type: 'TRIGGER',
            subtitle: 'Generic sales model. Select this and you can further customize.',
            img: 'https://via.placeholder.com/80?text=Nina', // Placeholder for the avatar image
        },
    ];

    return (
        <div className="space-y-3 dark:bg-black p-8 w-[100%] min-h-screen">
            <section className='flex flex-col justify-center items-center space-y-5'>
                <h2 className="mb-4 font-bold text-3xl text-gray-800 dark:text-white">Create Agent</h2>

                <p className="mb-4 text-gray-600 text-lg dark:text-gray-400">
                    Begin from the ground up for a fully personalized agent experience.
                </p>
                <section className='flex space-x-3'>
                    <div
                        onClick={() => setAgentType('text')}
                        className={`createAgentcard flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${agentType === 'text' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'dark:bg-gray-950 dark:text-white'}`}
                    >
                        <BsBodyText className='dark:text-white animate-pulse' size={50} />
                        <h2 className='text-2xl'>Chatting</h2>
                    </div>
                    <div
                        onClick={() => setAgentType('voice')}
                        className={`createAgentcard flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${agentType === 'voice' ? 'bg-gradient-to-r from-red-400 to-purple-500 text-white' : 'dark:bg-gray-950 dark:text-white'}`}
                    >
                        <RiUserVoiceLine className='dark:text-white' size={50} />
                        <h2 className='text-2xl'>Voice Call</h2>
                    </div>
                </section>






                <div className='w-[80%]'>
                    <AgentCard type={agentType} />
                </div>
                {/* Step Indicators */}

            </section>
           <div className='space-y-3 dark:bg-slate-700 p-5'>
           <h2 className='text-2xl dark:text-white'>
                Choose A Temaplete
            </h2>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                    <div key={template.id} className="flex flex-col bg-gray-50 dark:bg-gray-950 p-4 rounded-lg dark:text-white">
                        <div className="flex items-center mb-2">
                            <img src={template.img} alt={template.name} className="mr-3 rounded-full w-12 h-12" />
                            <div>
                                <h3 className="font-semibold text-lg">{template.name}</h3>
                                <span className="bg-blue-500 px-2 py-1 rounded font-medium text-white text-xs">{template.type}</span>
                            </div>
                        </div>
                        <p className="mb-4 text-gray-400">{template.subtitle}</p>

                    </div>
                ))}
            </div>
           </div>


        </div>
    );
};

export default CreateAgent;
