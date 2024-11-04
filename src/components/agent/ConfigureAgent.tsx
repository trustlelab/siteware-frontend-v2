import React, { useState, useEffect } from 'react';
import Tab from './voice/config/Tab';
import { FaPhone } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setId, fetchAgentData } from '../../features/slices/agentSlice';
import { RootState, AppDispatch } from '../../app/store';
import API from '../../utils/API';
import AgentConfig from './voice/config/AgentConfig';
import TranscriberConfig from './voice/config/TranscriberConfig';
import VoiceConfig from './voice/config/VoiceConfig';
import CallConfig from './voice/config/CallConfig';
import FunctionsConfig from './voice/config/FunctionsConfig';
import TasksConfig from './voice/config/TaskConfiguration';
import { useTranslation } from 'react-i18next';
import SpeakToAgent from './SpeakToAgent';
import Chat from './Chat';
import KnowledgeBaseConfig from './voice/KnowledgebaseConfig';

interface Agent {
  id: number;
  name: string;
  model: string;
}

interface AgentsResponse {
  status: number;
  message: string;
  agents: Agent[];
}

const ConfigureAgent: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('Model');
  const [agents, setAgents] = useState<Agent[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const currentId = useSelector((state: RootState) => state.agent.id);
  const currentAgentName = useSelector((state: RootState) => state.agent.agentData?.name);
  const currentAgentType = useSelector((state: RootState) => state.agent.agentData?.agentType);


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await API.get<AgentsResponse>('/agent/getlist');
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    if (currentId) {
      dispatch(fetchAgentData(currentId));
      localStorage.setItem('selectedAgentId', currentId.toString());
    } else {
      const savedAgentId = localStorage.getItem('selectedAgentId');
      if (savedAgentId) {
        const id = parseInt(savedAgentId, 10);
        dispatch(setId(id));
        dispatch(fetchAgentData(id));
      }
    }
  }, [dispatch, currentId]);

  const handleAgentClick = (id: number) => {
    if (currentId !== id) {
      dispatch(setId(id));
      dispatch(fetchAgentData(id));
      localStorage.setItem('selectedAgentId', id.toString());
    }
  };

  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value, 10);
    handleAgentClick(id);
    console.log('Rendering Tabs with agentType:', currentAgentType);

  };

  const renderContent = () => {
    console.log('Current Agent Type:', currentAgentType);
    console.log('Active Tab:', activeTab);

    if (currentAgentType === 'TEXT') {
      switch (activeTab) {
        case 'Agent':
          return <AgentConfig />;
        case 'Knowledge Base':
          return <KnowledgeBaseConfig />;
        case 'Chat':
          return <Chat />;
        default:
          return <AgentConfig />;
      }
    } else if (currentAgentType === 'VOICE') {
      switch (activeTab) {
        case 'Agent':
          return <AgentConfig />;
        case 'Transcriber':
          return <TranscriberConfig />;
        case 'Knowledge Base':
          return <KnowledgeBaseConfig />;
        case 'Voice':
          return <VoiceConfig />;
        case 'Call':
          return <CallConfig />;
        case 'Functions':
          return <FunctionsConfig />;
        case 'Tasks':
          return <TasksConfig />;
        default:
          return <AgentConfig />;
      }
    }
    return <AgentConfig />;
  };



  return (
    <div className="w-[90%] m-8 p-6 bg-white dark:bg-gray-900 dark:border-gray-600 rounded-xl shadow border border-[#eaecf0] flex-col justify-start items-start gap-8 inline-flex">
      {/* Dropdown for mobile devices */}
      <div className="xl-custom:hidden">
        <select
          value={currentId || ''}
          onChange={handleAgentChange}
          className="bg-gray-100 dark:bg-gray-800 p-2 rounded w-full"
        >
          <option value="">{t('select_agent')}</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>



      {/* Main content area */}
      <div className="flex flex-col w-full space-y-4">
        <div className="flex justify-between">
          <div className="rounded-full text-xl space-y-5">
            <p>{currentAgentName || t('select_agent')}</p>
            {currentAgentType === 'VOICE' && (
              <div className="border-green-600 dark:bg-gray-900 px-2 border rounded-lg text-green-500 dark:text-gray-300">
                <div className="font-semibold text-sm">{t('call_rate')}</div>
              </div>
            )}
          </div>

          {currentAgentType === 'VOICE' && (
            <div className="flex space-x-4">
              <button className="flex items-center justify-center hover:dark:bg-gray-700 dark:bg-gray-800 shadow-md px-4 py-2 rounded-lg h-10 dark:text-gray-300 transition duration-200 text-sm md:text-base">
                <span className="hidden sm:inline">{t('incoming_calls')}</span>
                <span className="sm:hidden">
                  <FaPhone />
                </span>
              </button>

              <SpeakToAgent />
            </div>
          )}
        </div>


        <Tab onSelect={setActiveTab} agentType={currentAgentType || 'TEXT'} />


        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ConfigureAgent;
