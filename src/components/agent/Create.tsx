import React, { useState } from 'react';
import AgentCard from './AgentTemplates';
import { BsBodyText } from 'react-icons/bs';
import { RiUserVoiceLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const CreateAgent: React.FC = () => {
  const { t } = useTranslation('createAgent'); // Use the 'createAgent' namespace
  const [agentType, setAgentType] = useState<'voice' | 'text'>('text');

  const templates = [
    {
      id: 1,
      name: 'Nina',
      type: 'OUTBOUND',
      subtitle: t('generic_sales_model'), // Translated subtitle
      img: 'https://via.placeholder.com/80?text=Nina',
    },
    {
      id: 2,
      name: 'Nina',
      type: 'INBOUND',
      subtitle: t('generic_sales_model'), // Translated subtitle
      img: 'https://via.placeholder.com/80?text=Nina',
    },
    {
      id: 3,
      name: 'Nina',
      type: 'TRIGGER',
      subtitle: t('generic_sales_model'), // Translated subtitle
      img: 'https://via.placeholder.com/80?text=Nina',
    },
  ];

  return (
    <div className="space-y-3 p-4 sm:p-8 w-full min-h-screen">
      <section className="flex flex-col justify-center items-center space-y-5">
        <h2 className="mb-4 font-bold text-3xl text-gray-800 dark:text-white">{t('create_agent')}</h2>
        <p className="mb-4 text-gray-600 text-lg dark:text-gray-400">{t('personalized_agent')}</p>
        
        {/* Agent Type Selection */}
        <section className="flex space-x-3">
          <div
            onClick={() => setAgentType('text')}
            className={`createAgentcard flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${agentType === 'text' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'dark:bg-gray-950 dark:text-white'}`}
          >
            <BsBodyText className="dark:text-white animate-pulse" size={50} />
            <h2 className="text-2xl">{t('chatting')}</h2> {/* Translated text */}
          </div>
          <div
            onClick={() => setAgentType('voice')}
            className={`createAgentcard flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${agentType === 'voice' ? 'bg-gradient-to-r from-red-400 to-purple-500 text-white' : 'dark:bg-gray-950 dark:text-white'}`}
          >
            <RiUserVoiceLine className="dark:text-white" size={50} />
            <h2 className="text-2xl">{t('voice_call')}</h2> {/* Translated text */}
          </div>
        </section>

        {/* AgentCard section */}
        <div className="w-full sm:w-[80%]">
          <AgentCard type={agentType} />
        </div>
      </section>
      
      {/* Template Selection */}
      <div className="space-y-3 dark:bg-slate-700 p-5 rounded-lg">
        <h2 className="text-2xl dark:text-white">{t('choose_template')}</h2> {/* Translated text */}
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
